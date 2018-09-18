const Prism = require('prismjs');

class Hightlight extends doczilla.Plugin {

  constructor(options, doczilla) {
    super(options, doczilla);
    doczilla.on('beforeCreateParser', opts => {
      opts.highlight = (source, lang) => {
        const result = Prism.highlight(source, Prism.languages[lang], lang);
        const event = { result, source, lang };
        doczilla.emit('highlight', event);
        return event.result;
      };
    });
  }

}

module.exports = Hightlight;