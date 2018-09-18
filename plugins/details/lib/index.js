const CustomContainer = require('markdown-it-container');

class Details extends doczilla.Plugin {

  constructor(options, doczilla) {
    super(options, doczilla);
    doczilla.on('container', event => {
      event.containers.push({
        name: 'details',
        open(event) {
          const summary = event.param || 'Details';
          return `<details class="expand"><summary>${summary}</summary>\n`;
        },
        close() {
          return '</details>\n';
        }
      });
    });
  }

}

module.exports = Details;