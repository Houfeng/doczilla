const Renderer = require('./renderer');
require('../docs/data');

const renderer = new Renderer();
const html = renderer.render('/');
console.log(html);