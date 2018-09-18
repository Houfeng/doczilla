const CustomContainer = require('markdown-it-container');

class Hightlight extends doczilla.Plugin {

  constructor(options, doczilla) {
    super(options, doczilla);
    doczilla.on('afterCreateParser', md => {
      const event = { containers: [] };
      doczilla.emit('container', event);
      const { containers } = event;
      containers.forEach(item => {
        const { name, marker, validate, render, open, close } = item;
        md.use(CustomContainer, name, {
          marker: marker,
          validate: validate || function (params) {
            const value = params.trim();
            return value === name ||
              new RegExp(`^${name}\\s(.*)$`, 'i').test(value);
          },
          render: render || function (tokens, index) {
            const info = tokens[index].info.trim()
              .match(new RegExp(`^${name}\\s(.*)$`, 'i'));
            if (tokens[index].nesting === 1) {
              const param = info && info[1];
              return open && open({ tokens, index, name, param });
            } else {
              return close && close({ tokens, index, name });
            }
          }
        });
      });
    });
  }

}

module.exports = Hightlight;