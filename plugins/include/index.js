const path = require('path');
const fs = require('fs');

class Include extends doczilla.Plugin {

  constructor(options, doczilla) {
    super(options, doczilla);
    doczilla.on('place', this.place.bind(this));
  }

  place(event) {
    event.places.push({
      name: 'include',
      render: this.render.bind(this)
    });
  }

  async render(opts) {
    const { param, doc } = opts;
    const { root, filename } = doc;
    const mdFile = path.resolve(root, filename);
    const includeFile = path.resolve(path.dirname(mdFile), param);
    if (!fs.existsSync(includeFile)) {
      const message = `Cannt find: ${includeFile}`;
      doczilla.error(message);
      return message;
    }
    const source = await doczilla.utils.readFile(includeFile);
    const includeDoc = await doczilla.parseSource(source, includeFile);
    return includeDoc.result;
  }

}

module.exports = Include;