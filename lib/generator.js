global.window = global;
global.React = require('react');

const { dirname, normalize, resolve } = require('path');
const { renderToString } = require('react-dom/server');
const { writeFile, readFile, mkdirp } = require('./utils');
const stp = require('stp');
const pkg = require('../package.json');

let tempate;
async function renderHtml(filePath, info) {
  if (!tempate) {
    tempate = stp(await readFile(resolve(__dirname, './template.html')));
  }
  return writeFile(filePath, tempate(info));
}

function renderDoc(location) {
  const { createStaticApp } = require('../build/renderer/App');
  const context = {};
  const html = renderToString(createStaticApp({ location, context }));
  return context.url ? null : html;
}

async function render(ctx, locale, group, doc) {
  const { output, baseUri, extname, locales } = ctx.conf;
  const name = (locale && group && doc) ?
    normalize(`${locale.name}/${group.name}/${doc.name}`) : '/';
  const location = normalize(`/${baseUri}/${name}`);
  const result = await renderDoc(location);
  const filename = (!name || name === '/') ? 'index' : name;
  const filePath = normalize(`${output}/${`${baseUri}/${filename}`}${extname}`);
  await mkdirp(dirname(filePath));
  const route = (locale && group && doc) ? encodeURIComponent(JSON.stringify({
    lang: locale.name, group: group.name, doc: doc.name
  })) : '';
  const firstLocale = locales[0] || {};
  const { styles, scripts } = ctx.getPluginAssets();
  await renderHtml(filePath, {
    result, route, styles, scripts,
    base: !name || name === '/' ? '.' : '../../',
    lang: locale ? locale.name : firstLocale.name || '',
    title: locale && doc ? `${doc.title} - ${locale.title}` :
      firstLocale.title || pkg.name,
    keywords: doc ? doc.keywords || doc.title :
      firstLocale.keywords || firstLocale.title || pkg.name,
    description: doc ? doc.description || doc.title :
      firstLocale.description || firstLocale.title || pkg.name,
    author: pkg.name,
  });
  ctx.log('finished:', filename + extname);
}

async function generate(ctx, data) {
  ctx.info('Generating...');
  global.DOC_DATA = data;
  await Promise.all(data.locales.map(locale => {
    return Promise.all(locale.groups.map(group => {
      return Promise.all(group.docs.map(doc => {
        return render(ctx, locale, group, doc);
      }));
    }));
  }));
  await render(ctx);
}

module.exports = { generate };