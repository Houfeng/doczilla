class Plugin {

  constructor(options, host) {
    this.options = options;
    this.host = host || global.doczilla;
  }

}
module.exports = Plugin;