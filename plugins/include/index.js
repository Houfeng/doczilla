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
    const mainFile = path.resolve(root, filename);
    const subFile = path.resolve(path.dirname(mainFile), param);
    if (!fs.existsSync(subFile)) {
      const message = `Cannt find: ${subFile}`;
      doczilla.error(message);
      return message;
    }
    const subSource = await doczilla.utils.readFile(subFile);
    const subDoc = await doczilla.parseSource(subSource, subFile);
    doczilla.addDependents(subFile, mainFile);
    return subDoc.result;
  }

}

module.exports = Include;