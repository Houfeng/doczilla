class Place extends doczilla.Plugin {

  constructor(options, doczilla) {
    super(options, doczilla);
    doczilla.on('beforeParse', this.handle.bind(this, 'beforeParse'));
    doczilla.on('afterParse', this.handle.bind(this, 'afterParse'));
  }

  async handle(mode, doc) {
    const event = { places: [] };
    await doczilla.emitAsync('place', event);
    const places = event.places.filter(item => {
      item.mode = item.mode || 'beforeParse'
      return item.mode === mode;
    });
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