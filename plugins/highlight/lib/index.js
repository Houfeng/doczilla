const Prism = require('prismjs');
const loadLanguages = require('prismjs/components/');

loadLanguages(require('./languages.json'));

class Hightlight extends doczilla.Plugin {

  constructor(options, doczilla) {
    super(options, doczilla);
    doczilla.on('beforeCreateParser', this.beforeCreateParser.bind(this));
  }

  beforeCreateParser(opts) {
    opts.highlight = this.highlight.bind(this);
  }

  highlight(source, lang) {
    if (lang == 'jsx') lang = 'js';
    if (!Prism.languages[lang]) lang = 'markup';
    const result = Prism.highlight(source, Prism.languages[lang], lang);
    const event = { result, source, lang };
    doczilla.emit('highlight', event);
    return event.result;
  }

}

module.exports = Hightlight;