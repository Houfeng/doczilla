global.window = global;
global.React = require('react');

const { dirname, normalize } = require('path');
const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router');
const { writeFile, readFile, mkdirp } = require('./utils');

let tempateText;

function renderDoc(location) {
  const { InnerApp } = require('../build/renderer/App');
  const context = {};
  const html = renderToString(
    createElement(StaticRouter, { location, context }, createElement(InnerApp))
  );
  return context.url ? null : html;
}

async function write(ctx, locale = '', group = '', doc = '') {
  const { output, baseUri, extname } = ctx.conf;
  const name = normalize(`${locale}/${group}/${doc}`);
  const location = normalize(`/${baseUri}/${name}`);
  const result = await renderDoc(location);
  const filename = (!name || name === '/') ? 'index' : name;
  const filePath = normalize(`${output}/${`${baseUri}/${filename}`}${extname}`);
  await mkdirp(dirname(filePath));
  const routeInfo = encodeURIComponent(JSON.stringify({ locale, group, doc }));
  let html = tempateText
    .replace('<div id="root"></div>', `<div id="root">${result}</div>`);
  if (name && name !== '/') {
    html = html
      .replace('<!--base-->', `<base href="../../" route="${routeInfo}" />`);
  }
  await writeFile(filePath, html);
  ctx.log('finished:', filename + extname);
}

async function readTemplate(ctx) {
  const { output } = ctx.conf;
  const filePath = `${output}/index.html`;
  tempateText = await readFile(filePath);
}

async function render(ctx, data) {
  ctx.info('Rendering...');
  global.DOC_DATA = data;
  await readTemplate(ctx);
  const { locales } = data;
  await Promise.all(locales.map(localeItem => {
    const locale = localeItem.name;
    return Promise.all(localeItem.groups.map(groupItem => {
      const group = groupItem.name;
      return Promise.all(groupItem.docs.map(docItem => {
        const doc = docItem.name;
        return write(ctx, locale, group, doc);
      }));
    }));
  }));
  await write(ctx);
}

module.exports = { render };