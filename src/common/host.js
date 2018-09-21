import EventEmitter from 'events';
import pkg from '../../package.json';

class Host extends EventEmitter {

  constructor() {
    super();
    global[pkg.name] = this;
  }

  getPlugin = (name) => {
    const plugins = this.getPlugins();
    return plugins && plugins.find(item => item.name === name);
  }

  getPlugins = () => window.DOC_DATA && window.DOC_DATA.plugins;

}

export const host = new Host();