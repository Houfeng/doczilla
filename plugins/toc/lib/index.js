const toc = require("markdown-it-table-of-contents");

class Plugin extends doczilla.Plugin {

  constructor(options) {
    super(options);
    doczilla.on('afterCreateParser', parser => parser.use(toc));
  }

}

module.exports = Plugin;