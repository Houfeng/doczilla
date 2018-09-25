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
const del = require('del');
const pkg = require('../package');
const Plugin = require('./plugin');
const { isString, isArray } = require('ntils');

const debug = require('debug')('Generator');
const watchOptions = { ignoreInitial: true };

const builtInPlugins = [
  path.resolve(__dirname, '../plugins/place'),
  path.resolve(__dirname, '../plugins/include'),
  path.resolve(__dirname, '../plugins/container'),
  path.resolve(__dirname, '../plugins/highlight'),
  path.resolve(__dirname, '../plugins/details'),
  path.resolve(__dirname, '../plugins/card'),
];

class Generator extends EventEmitter {

  constructor(root, env) {
    super();
    global[pkg.name] = this;
    this.root = path.resolve(process.cwd(), root || './');
    this.env = env || 'build';
    this.Plugin = Plugin;
    this.utils = utils;
    this.init();
  }

  init() {
    this.assets = { styles: [], scripts: [] };
    this.caches = Object.create(null);
    this.dependents = Object.create(null);
    this.assetsWrited = false;
    this.plugins = null;
    this.off();
    debug('init', this.root);
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
    if (this.env === 'dev') this.conf.mode = 'hash';
    if (!this.conf.baseUri) this.conf.baseUri = '';
    if (!this.conf.extname) this.conf.extname = '';
    if (this.conf.mode !== 'browser') this.conf.baseUri = '';
    if (this.conf.mode !== 'hash' && !this.conf.extname) {
      this.conf.extname = '.html';
    }
    debug('readConf', this.conf);
    await this.emitAsync('readConf', this);
  }

  async createParser() {
    if (this.parser) return;
    const options = { html: true, linkify: true };
    await this.emitAsync('beforeCreateParser', options, this);
    this.parser = new MarkdownIt(options);
    this.render = async (...args) => {
      await this.emitAsync('beforeRender', ...args, this);
      const result = this.parser.render(...args);
      const afterEvent = { result };
      await this.emitAsync('afterRender', afterEvent, this);
      return afterEvent.result;
    };
    await this.emitAsync('afterCreateParser', this.parser, this);
    await utils.sleep(600);
  }

  resolve(name, trial = true) {
    try {
      return require.resolve(name);
    } catch (err) {
      if (!trial) return this.error(err.message);
      const tryPath = path.normalize(`${this.root}/node_modules/${name}`);
      return this.resolve(tryPath, false);
    }
  }

  require(name) {
    const resolvePath = this.resolve(name);
    if (!resolvePath) return;
    return require(resolvePath);
  }

  createPluginInstance(item, index) {
    const { root } = this;
    if (isString(item)) item = { name: item, options: {} };
    const { name, options } = item;
    if (!name) throw new Error(`Invalid plugin: at ${index}`);
    const resolveName = name[0] == '.' ? path.resolve(root, name) : name;
    const modClass = this.require(resolveName);
    if (!modClass) throw new Error(`Cannot load plugin: ${name}`);
    const pkgFile = path.normalize(`${resolveName}/package.json`);
    const pkgInfo = this.require(pkgFile);
    const location = path.dirname(this.resolve(pkgFile));
    if (!utils.isFunction(modClass)) throw new Error(`Invalid plugin: ${name}`);
    const modInstance = new modClass(options, this);
    modInstance.info = pkgInfo;
    modInstance.location = location;
    modInstance.options = options;
    this.info('Load plugin:', pkgInfo.name);
    return modInstance;
  }

  async loadPlugins() {
    if (this.plugins) return;
    const plugins = this.conf.plugins || [];
    plugins.unshift(...builtInPlugins);
    this.plugins = (plugins || [])
      .map((item, index) => this.createPluginInstance(item, index));
    await this.emitAsync('loadPlugins', this);
  }

  async safeExec(fn) {
    try {
      return await fn();
    } catch (err) {
      this.error(err.message);
    }
  }

  splitSource(source) {
    let meta = '';
    source = (source || '').replace(/---([\s\S]+?)---/, (...args) => {
      meta = (args[1] || '').trim();
      return '';
    }).trim();
    return { source, meta };
  }

  async parseDoc(filename) {
    if (!filename || /node_modules/i.test(filename)) return;
    const cacheKey = path.resolve(this.root, filename);
    const cacheValue = this.caches[cacheKey];
    if (cacheValue) return cacheValue;
    const mdText = await this.safeExec(() => utils.readFile(filename));
    debug('parseDoc', 'mdText', mdText);
    if (!mdText) return;
    const { source, meta } = this.splitSource(mdText);
    debug('parseDoc', 'meta', meta);
    if (!source || !meta) return;
    const info = await this.safeExec(() => yaml.safeLoad(meta));
    if (!info) return;
    const doc = this.parseSource(source, filename, info);
    delete doc.root;
    this.caches[cacheKey] = doc;
    this.log('finished:', filename);
    return doc;
  }

  async parseSource(source, filename, info = {}) {
    if (!filename) filename = utils.newGuid();
    const doc = { ...info, source, filename, root: this.root };
    await this.emitAsync('beforeParse', doc);
    doc.result = await this.render(await doc.source);
    await this.emitAsync('afterParse', doc);
    return doc;
  }

  async parseGroup(group) {
    debug('parseGroup', group.name, group.docs);
    if (!group.docs) {
      group.docs = [];
      return group;
    }
    const docFiles = await globby(group.docs, { cwd: this.root });
    group.docs = (await this.batchExec(docFiles, item => this.parseDoc(item)))
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
    const docs = (await this.batchExec(docFiles, item => this.parseDoc(item)))
      .filter(doc => !!doc);
    docs.forEach(doc => {
      const group = locale.groups.find(item => item.name == doc.group);
      if (!group) return;
      group.docs = group.docs || [];
      group.docs.push(doc);
    });
    return locale;
  }

  async writeData(locales) {
    this.info('Writing data...');
    const { output, mode, baseUri, extname } = this.conf;
    const dataFile = path.normalize(`${output}/data.js`);
    const plugins = this.plugins.map(plugin => (
      { name: plugin.info.name, options: plugin.options }
    ));
    const data = { locales, plugins, mode, baseUri, extname };
    await utils.writeFile(
      dataFile, `window.DOC_DATA=${JSON.stringify(data)};`
    );
    await this.preRender(data);
  }

  async preRender(data) {
    const { mode } = this.conf;
    if (this.env !== 'build' || mode === 'hash') return;
    const { render } = require('./renderer');
    await render(this, data);
  }

  async writeAsstes() {
    if (this.assetsWrited) return;
    this.assetsWrited = true;
    this.info('Writing assets...');
    const { output } = this.conf;
    const files = `${path.resolve(__dirname, '../')}/build/web/**/*.*`;
    debug('writeAsstes', files, output);
    await utils.copyFiles(files, output);
    await this.injectPluginAsstes();
  }

  async injectPluginAsstes() {
    await Promise.all(this.plugins.map(item => this.writePluginAssets(item)));
    const { styles, scripts } = this.assets;
    const stylesText = styles
      .map(url => `<link href="./${url}" rel="stylesheet" />`)
      .join('') + '</head>';
    const scriptsText = scripts
      .map(url => `<script src="./${url}"></script>`)
      .join('') + '</body>';
    const { output } = this.conf;
    const indexFile = path.resolve(output, './index.html');
    const indexText = (await utils.readFile(indexFile))
      .replace('</head>', stylesText)
      .replace('</body>', scriptsText);
    await utils.writeFile(indexFile, indexText);
  }

  async writePluginAssets(plugin) {
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

  //批量执行时用这个函数，方案统在这个函数中切换串行或并行
  async batchExec(list, fn, parallel = true) {
    if (parallel) return Promise.all(list.map(fn));
    const results = [];
    for (let item of list) results.push(await fn(item));
    return results;
  }

  async clean() {
    await this.readConf();
    const { output } = this.conf;
    return del(output);
  }

  async build() {
    await this.emitAsync('buid', this);
    await this.readConf();
    await this.loadPlugins();
    await this.createParser();
    this.info('Parsing...');
    const { locales = [] } = utils.clone(this.conf);
    if (!utils.isArray(locales)) return this.error('Invalid config');
    await this.batchExec(locales, item => this.parseLocale(item));
    await this.writeAsstes();
    await this.writeData(this.sortDocs(locales));
    this.info('Done');
  }

  async dev() {
    await this.build();
    const { output, port = await utils.oneport() } = this.conf;
    this.server = new nokit.Server({
      root: output, port: port,
      cache: { enabled: false, maxAge: 0 },
      log: { enabled: true },
      public: { '*': output }
    });
    this.server.plugin('express', new ExpressPlugin());
    await this.watchDocs();
    await this.watchPlugins();
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
      files: `${output}/data.js`,
      ui: { port: await utils.oneport() }
    });
    this.server.use('^/(?!(-rc-|browser-sync))@browser-sync',
      connectBrowserSync(bsInstance));
  }

  cleanDocCache(filename) {
    this.caches[filename] = null;
    const map = this.dependents[filename];
    if (!map) return;
    Object.keys(map).forEach(file => this.cleanDocCache(file));
  }

  addDependents(filename, dependents) {
    if (!isArray(dependents)) dependents = [dependents];
    const map = this.dependents[filename] || {};
    dependents.forEach(file => map[file] = true);
    this.dependents[filename] = map;
  }

  removeDependents(filename, dependents) {
    const map = this.dependents[filename];
    if (!map) return;
    if (!isArray(dependents)) dependents = [dependents];
    dependents.forEach(file => map[file] = false);
  }

  isDocFile(filename) {
    return path.extname(filename) === '.md' || this.dependents[filename];
  }

  createWatcher(files, onChange) {
    const watcher = chokidar.watch(files, watchOptions);
    watcher.on('all', async (action, filename) => {
      if (!['add', 'change'].includes(action)) return;
      if (onChange) onChange(filename);
    });
    return watcher;
  }

  async watchDocs() {
    this.createWatcher(`${this.root}/**/*.*`, filename => {
      if (!this.isDocFile(filename)) return;
      this.cleanDocCache(filename);
      this.build();
    });
  }

  cleanCodeCache() {
    Object.keys(require.cache).forEach(filename => {
      if (this.plugins.find(plugin => filename.startsWith(plugin.location))) {
        delete require.cache[filename];
      }
    });
    this.init();
  }

  async watchPlugins() {
    const files = [];
    this.plugins.forEach(plugin => {
      const { location, info } = plugin;
      if (!location || !info) return;
      const { assets = './assets/**/*.*' } = info;
      files.push(`${plugin.location}/**/*.js`);
      files.push(`${plugin.location}/lib/**/*.*`);
      files.push(path.resolve(location, assets));
    });
    files.push(`${path.resolve(__dirname, '../build')}/**/*.*`);
    this.createWatcher(files, () => {
      this.cleanCodeCache();
      this.build();
    });
  }

  async create(type) {
    type = type || 'docs';
    this.log('Initializing...');
    await this.emitAsync('init', this);
    if (!(['docs', 'plugin'].includes(type))) {
      return this.error('Invalid type:', type);
    }
    if (type === 'docs' &&
      fs.existsSync(path.resolve(this.root, `./${pkg.name}.yml`))) {
      return this.error('Cannot initialize again');
    }
    if (type === 'plugin' &&
      fs.existsSync(path.resolve(this.root, './package.json'))) {
      return this.error('This directory is not empty');
    }
    const files = path.resolve(__dirname, `../templates/${type}/**/*.*`);
    await utils.copyFiles(files, this.root);
    this.info('Done');
  }

}

Generator.Plugin = Plugin;

module.exports = Generator;