class Card extends doczilla.Plugin {

  constructor(options, doczilla) {
    super(options, doczilla);
    doczilla.on('container', this.container.bind(this));
  }

  container(event) {  
    event.containers.push({ 
      name: 'card',
      open(event) {
        let percent = Number(event.param);
        if (percent > 100 || percent < 0) percent = 100;
        return `<div class="card" style="width:${percent}%;">
        <div class="inner">`; 
      },
      close() {
        return '</div></div>';
      }
    });
  }

}

module.exports = Card;