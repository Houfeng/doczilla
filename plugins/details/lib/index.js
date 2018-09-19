class Details extends doczilla.Plugin {

  constructor(options, doczilla) {
    super(options, doczilla);
    doczilla.on('container', this.container.bind(this));
  }

  container(event) {
    event.containers.push({
      name: 'details',
      open(event) {
        const text = (event.param || 'Details').split(' ');
        const show = `<span class="state-open">${text[0]}</span>`;
        const hide = `<span class="state-close">${text[1] || text[0]}</span>`;
        return `<details><summary>${show}${hide}</summary>`;
      },
      close() {
        return '</details>';
      }
    });
  }

}

module.exports = Details;