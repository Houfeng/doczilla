class Place extends doczilla.Plugin {

  constructor(options, doczilla) {
    super(options, doczilla);
    doczilla.on('beforeParse', this.beforeParse.bind(this));
  }

  async beforeParse(doc) {
    const event = { places: [] };
    doczilla.emit('place', event);
    const { places } = event;
    for (let place of places) {
      const { name, render, marker = '::' } = place;
      if (!render) return;
      const regexp = new RegExp(`${marker}\\s*${name}\\s+(.*)`, 'ig');
      let info;
      while (info = regexp.exec(doc.source)) {
        const match = info[0], param = info[1];
        const result = await render({ match, param, doc });
        doc.source = doc.source.replace(match, result);
      }
    }
  }

}

module.exports = Place;