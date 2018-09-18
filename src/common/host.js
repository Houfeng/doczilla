import EventEmitter from 'events';
import pkg from '../../package.json';

class Host extends EventEmitter {

  constructor() {
    super();
    global[pkg.name] = this;
  }

}

export const host = new Host();