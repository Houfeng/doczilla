const path = require('path');

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

  render(opts) {
    const { param, doc } = opts;
    const { root, filename } = doc;
    const mdFile = path.resolve(root, filename);
    const includeFile = path.resolve(path.dirname(mdFile), param);
    return includeFile;
  }

}

module.exports = Include;