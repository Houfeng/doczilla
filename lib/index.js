const globby = require('globby');
const utils = require('./utils');
const confman = require('confman');
const path = require('path');
const fs = require('fs');
const EventEmitter = require('eify');
const console = require('console3');
const yaml = require('js-yaml');
const MarkdownIt = require('markdown-it');
const nokit = require('nokitjs');
const ExpressPlugin = require('nokit-plugin-express');
const browserSync = require('browser-sync');
const connectBrowserSync = require('connect-browser-sync');
const chokidar = require('chokidar');
const pkg = require('../package');
const Plugin = require('./plugin');
const { isString } = require('ntils');

const debug = require('debug')('Generator');

const builtInPlugins = [
  path.resolve(__dirname, '../plugins/place'),
  path.resolve(__dirname, '../plugins/include'),
  path.resolve(__dirname, '../plugins/container'),
  path.resolve(__dirname, '../plugins/details'),
  path.resolve(__dirname, '../plugins/highlight'),
];

class Generator extends EventEmitter {

  constructor(root) {
    super();
    this.root = path.resolve(process.cwd(), root || './');
    this.assets = { styles: [], scripts: [] };
    this.Plugin = Plugin;
    this.caches = Object.create(null);
    global[pkg.name] = this;
    this.emit('construction', this);
    debug('constructor', this.root);
  }

  log(...args) {
    console.log(`[${pkg.name}]`, ...args);
  }

  error(...args) {
    console.error(`[${pkg.name}]`, ...args);
  }

  info(...args) {
    console.info(`[${pkg.name}]`, ...args);
  }

  warn(...args) {
    console.warn(`[${pkg.name}]`, ...args);
  }

  async readConf() {
    if (this.conf) return;
    this.conf = confman.load(path.normalize(`${this.root}/${pkg.name}`));
    this.conf.output = path.resolve(this.root, this.conf.output || './docs');
    debug('readConf', this.conf);
    await this.emitAsync('readConf', this);
  }

  async createParser() {
    const options = { html: true, linkify: true };
    await this.emitAsync('beforeCreateParser', options, this);
    const md = new MarkdownIt(options);
    this.render = async (...args) => {
      await this.emitAsync('beforeRender', ...args, this);
      const result = md.render(...args);
      const afterEvent = { result };
      await this.emitAsync('afterRender', afterEvent, this);
      return afterEvent.result;
    };
    await this.emitAsync('afterCreateParser', md, this);
  }

  async loadPlugins() {
    if (this.plugins) return;
    const { root } = this;
    const plugins = this.conf.plugins || [];
    plugins.unshift(...builtInPlugins);
    this.plugins = (plugins || []).map((item, index) => {
      if (isString(item)) item = { name: item, options: {} };
      const { name, options } = item;
      if (!name) throw new Error(`Invalid plugin: at ${index}`);
      const resolveName = name[0] == '.' ? path.resolve(root, name) : name;
      const pkgFile = path.normalize(`${resolveName}/package.json`);
      const pkgInfo = require(pkgFile);
      const location = path.dirname(pkgFile);
      const modClass = require(resolveName);
      if (!utils.isFunction(modClass)) {
        throw new Error(`Invalid plugin: ${name}`);
      }
      const modInstance = new modClass(options, this);
      modInstance.info = pkgInfo;
      modInstance.location = location;
      debug('loadPlugins', name, location);
      this.info('Load plugin:', pkgInfo.name);
      return modInstance;
    });
    await this.emitAsync('loadPlugins', this);
  }

  async parseDoc(filename) {
    if (/node_modules/i.test(filename)) return;
    const cacheKey = path.resolve(this.root, filename);
    const cacheValue = this.caches[cacheKey];
    if (cacheValue) return cacheValue;
    let source;
    try {
      source = await utils.readFile(filename);
    } catch (err) {
      this.error(err.message);
      return;
    }
    const result = this.parseSource(source, filename);
    this.caches[cacheKey] = result;
    return result;
  }

  async parseSource(source, filename) {
    let meta, fakeFile = false;
    if (!filename) {
      filename = path.normalize(`${this.root}/${utils.newGuid()}`);
      fakeFile = true;
    }
    source = source.replace(/---([\s\S]+?)---/, (...args) => {
      meta = (args[1] || '').trim();
      return '';
    }).trim();
    if (!meta) return;
    const item = { source, filename, root: this.root };
    try {
      Object.assign(item, yaml.safeLoad(meta));
    } catch (err) {
      this.error(err.message);
      return;
    }
    await this.emitAsync('beforeParse', item);
    item.result = await this.render(await item.source);
    await this.emitAsync('afterParse', item);
    if (!fakeFile) this.log('finished:', filename);
    delete item.root;
    return item;
  }

  async parseGroup(group) {
    debug('parseGroup', group.name, group.docs);
    if (!group.docs) {
      group.docs = [];
      return group;
    }
    const docFiles = await globby(group.docs, { cwd: this.root });
    group.docs = (await Promise.all(docFiles.map(item => this.parseDoc(item))))
      .filter(doc => !!doc);
    return group;
  }

  async parseLocale(locale) {
    const groups = locale.groups || [];
    locale.groups = await Promise
      .all(groups.map(item => this.parseGroup(item)));
    //处理直接挂到 locale 中的 docs
    if (!locale.docs) return locale;
    const docFiles = await globby(locale.docs, { cwd: this.root });
    delete locale.docs;
    const docs = (await Promise.all(docFiles.map(item => this.parseDoc(item))))
      .filter(doc => !!doc);
    docs.forEach(doc => {
      const group = locale.groups.find(item => item.name == doc.group);
      if (!group) return;
      group.docs = group.docs || [];
      group.docs.push(doc);
    });
    return locale;
  }

  async writeData(data) {
    this.info('Writing data...');
    const { output } = this.conf;
    const dataFile = path.normalize(`${output}/js/data.js`);
    await utils.writeFile(
      dataFile, `window.DOC_DATA=${JSON.stringify(data)};`
    );
  }

  async writeAsstes() {
    if (this.assetsWrited) return;
    this.info('Writing assets...');
    const { output } = this.conf;
    const files = `${path.resolve(__dirname, '../')}/build/**/*.*`;
    await Promise.all(this.plugins.map(item => this.writePluginAssets(item)));
    debug('writeAsstes', files, output);
    this.assetsWrited = true;
    return utils.copyFiles(files, output);
  }

  async writePluginAssets(plugin) {
    if (this.pluginAssetsWrited) return;
    const { output } = this.conf;
    const { location, info } = plugin;
    if (!location || !info) return;
    const { name, assets = './assets/**/*.*' } = info;
    if (!name || !assets) return;
    const target = path.normalize(`${output}/plugins/${name}`);
    const files = path.resolve(location, assets);
    debug('writePluginAssets', assets, output);
    await utils.copyFiles(files, target);
    const indexCss = path.normalize(`${target}/index.css`);
    if (fs.existsSync(indexCss)) {
      this.assets.styles.push(`plugins/${name}/index.css`);
    }
    const indexJs = path.normalize(`${target}/index.js`);
    if (fs.existsSync(indexJs)) {
      this.assets.scripts.push(`plugins/${name}/index.js`);
    }
    this.pluginAssetsWrited = true;
  }

  sortDocs(locales) {
    let maxIndex = Number.MAX_VALUE || 999999;
    locales.forEach(locale => {
      locale.groups.forEach(group => {
        group.docs = group.docs.filter(doc => doc && doc.title);
        group.docs.sort((a, b) => {
          a.group = group.name;
          b.group = group.name;
          let aIndex = isNaN(a.index) ? maxIndex : a.index;
          let bIndex = isNaN(b.index) ? maxIndex : b.index;
          return aIndex - bIndex;
        });
      });
    });
    return locales;
  }

  async build() {
    this.info('Generating...');
    await this.emitAsync('buid', this);
    await this.readConf();
    await this.loadPlugins();
    await this.createParser();
    const { locales = [] } = utils.clone(this.conf);
    if (!utils.isArray(locales)) return this.error('Invalid config');
    await Promise.all(locales.map(item => this.parseLocale(item)));
    await this.writeAsstes();
    await this.writeData({
      assets: this.assets,
      locales: this.sortDocs(locales)
    });
    this.info('Done');
  }

  async dev() {
    await this.build();
    const { output, port = await utils.oneport() } = this.conf;
    this.server = new nokit.Server({
      root: output, port: port,
      cache: { enabled: false, maxAge: 0 },
      public: { '*': output }
    });
    this.server.plugin('express', new ExpressPlugin());
    await this.watch();
    return this.server.start((err) => {
      if (err) return this.error(err);
      this.browserSync();
      this.warn('Started:', `http://127.0.0.1:${port}`);
    });
  }

  async browserSync() {
    const { output } = this.conf;
    const bsInstance = browserSync.create().init({
      logSnippet: false,
      open: false,
      files: `${output}/js/data.js`,
      ui: { port: await utils.oneport() }
    });
    this.server.use('^/(?!(-rc-|browser-sync))@browser-sync',
      connectBrowserSync(bsInstance));
  }

  async watch() {
    //启动文件监控
    const watcher = chokidar.watch(`${this.root}/**/*.md`, {
      ignoreInitial: true
    });
    watcher.on('all', async (action, filename) => {
      if (!['add', 'change'].includes(action)) return;
      this.caches[filename] = null;
      this.build();
    });
  }

  async init() {
    this.log('Initializing...');
    await this.emitAsync('init', this);
    const srcFile = path.resolve(__dirname, `../${pkg.name}.yml`);
    const buffer = await utils.readFile(srcFile);
    const dstFile = path.resolve(this.root, `./${pkg.name}.yml`);
    await utils.writeFile(dstFile, buffer);
    this.info('Done');
  }

}

Generator.Plugin = Plugin;

module.exports = Generator;