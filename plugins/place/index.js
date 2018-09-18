class Place extends doczilla.Plugin {

  constructor(options, doczilla) {
    super(options, doczilla);
    doczilla.on('beforeParse', doc => {
      const event = { places: [] };
      doczilla.emit('place', event);
      const { places } = event;
      places.forEach(place => {
        const { name, render, marker = '::' } = place;
        const regexp = new RegExp(`${marker}\\s*${name}\\s+(.*)`, 'i');
        doc.source = doc.source.replace(regexp, (match, param) => {
          return render ? render({ match, param, doc }) : match;
        });
      });
    });
  }

}

module.exports = Place;