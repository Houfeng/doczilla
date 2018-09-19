const globby = require('globby');
const utils = require('./utils');
const confman = require('confman');
const path = require('path');
const fs = require('fs');
const EventEmitter = require('eify');
const console = require('console3');
const yaml = require('js-yaml');
const MarkdownIt = require('markdown-it');
const pkg = require('../package');
const { isString } = require('ntils');
const Plugin = require('./plugin');

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
    this.root = path.resolve(process.cwd(), root);
    this.assets = { styles: [], scripts: [] };
    this.Plugin = Plugin;
    global[pkg.name] = this;
    this.emit('construction', this);
    debug('constructor', this.root);
  }

  /**
   * 打印日志
   */
  log(...args) {
    console.log(`[${pkg.name}]`, ...args);
  }

  /**
   * 打印日志
   */
  error(...args) {
    console.error(`[${pkg.name}]`, ...args);
  }

  /**
   * 打印日志
   */
  info(...args) {
    console.info(`[${pkg.name}]`, ...args);
  }

  /**
   * 打印日志
   */
  warn(...args) {
    console.warn(`[${pkg.name}]`, ...args);
  }

  /**
   * 读取项目配置
   */
  async readConf() {
    if (this.conf) return;
    this.conf = confman.load(path.normalize(`${this.root}/${pkg.name}`));
    this.conf.output = path.resolve(this.root, this.conf.output || './docs');
    debug('readConf', this.conf);
    await this.emitAsync('readConf', this);
  };

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

  /**
   * 加载插件
   */
  async loadPlugins() {
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

  /**
   * 解析单个文档
   */
  async parseDoc(filename) {
    if (/node_modules/i.test(filename)) return;
    let source, meta;
    try {
      source = await utils.readFile(filename);
    } catch (err) {
      this.error(err.message);
      return;
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
    this.log('finished:', filename);
    delete item.root;
    return item;
  };

  /**
   * 解析一个 group
   */
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
  };

  /**
   * 解析单个 locale 对象
   */
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

  /**
   * 向目标写入数据
   */
  async writeData(data) {
    this.info('Writing data...');
    const { output } = this.conf;
    const dataFile = path.normalize(`${output}/js/data.js`);
    await utils.writeFile(
      dataFile, `window.DOC_DATA=${JSON.stringify(data)};`
    );
  };

  /**
   * 向目标写入资源文件
   */
  async writeAsstes() {
    this.info('Writing assets...');
    const { output } = this.conf;
    const files = `${path.resolve(__dirname, '../')}/build/**/*.*`;
    await Promise.all(this.plugins.map(item => this.writePluginAssets(item)));
    debug('writeAsstes', files, output);
    return utils.copyFiles(files, output);
  };

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

  /**
   * 排序 locales
   */
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
      })
    });
    return locales;
  };

  /**
   * 构建一个 doc 项目
   */
  async build() {
    this.info('Generating...');
    await this.emitAsync('buid', this);
    await this.readConf();
    await this.loadPlugins();
    await this.createParser();
    const { locales = [] } = this.conf;
    if (!utils.isArray(locales)) return this.error('Invalid config');
    await Promise.all(locales.map(item => this.parseLocale(item)));
    await this.writeAsstes();
    await this.writeData({
      assets: this.assets,
      locales: this.sortDocs(locales)
    });
    this.info('Done');
  };

  /**
   * 初始化一个 doc 目录
   */
  async init() {
    this.log('Initializing...');
    await this.emitAsync('init', this);
    const srcFile = path.resolve(__dirname, `../${pkg.name}.yml`);
    const buffer = await utils.readFile(srcFile);
    const dstFile = path.resolve(this.root, `./${pkg.name}.yml`);
    await utils.writeFile(dstFile, buffer);
    this.info('Done');
  };

}

Generator.Plugin = Plugin;

module.exports = Generator;