const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router');
const App = require('../build/renderer/App');

export function render(location) {
  const context = {};
  const html = renderToString(
    createElement(StaticRouter, { location, context }, createElement(App))
  );
  return context.url ? null : html;
}