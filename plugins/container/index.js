const MarkContainer = require('markdown-it-container');
const debug = require('debug')('Container');

class Container extends doczilla.Plugin {

  constructor(options, doczilla) {
    super(options, doczilla);
    doczilla.on('afterCreateParser', parser => {
      const event = { containers: [] };
      doczilla.emit('container', event);
      const { containers } = event;
      containers.forEach(item => {
        const { name, marker, validate, render, open, close } = item;
        parser.use(MarkContainer, name, {
          marker: marker,
          validate: validate || function (params) {
            debug('validate', params);
            const value = params.trim();
            return value === name ||
              new RegExp(`^${name}\\s(.*)$`, 'i').test(value);
          },
          render: render || function (tokens, index) {
            //debug('render', tokens, index);
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

module.exports = Container;