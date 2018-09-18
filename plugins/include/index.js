
class Include extends doczilla.Plugin {

  constructor(options, doczilla) {
    super(options, doczilla);
    doczilla.on('place', event => {
      event.places.push({
        name: 'include', render(event) {
          return 'include 哈哈';
        }
      });
    });
  }

}

module.exports = Include;