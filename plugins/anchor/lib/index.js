const anchor = require("markdown-it-anchor");

class Plugin extends doczilla.Plugin {

  constructor(options) {
    super(options);
    doczilla.on('afterCreateParser', parser => parser.use(anchor));
  }

}

module.exports = Plugin;