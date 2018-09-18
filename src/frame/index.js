import mokit from 'mokit';
//import Transition from 'mokit-transition';
import Catalog from '../catalog';
import Article from '../article';
import docs from '../models/docs';
import pkg from '../../package.json';

import './index.less';

//mokit.use(Transition);

const Hello = new mokit.Component({
  template: require('./index.html'),
  components: { Catalog, Article },
  data() {
    return { docs, pkg };
  },
  //transition: new Transition(5),
  watch: {
    docs: function () {
      this.updatePageTitle();
    }
  },
  updatePageTitle() {
    if (!docs.doc || !docs.locale) return;
    document.title = `${docs.doc.title} - ${docs.locale.title}`;
  },
  switchLang(lang) {
    this.$router.go(`/${lang}/${docs.group.name}/${docs.doc.name}`);
  },
  keywordKeyDown(event) {
    let filtratedDocs = docs.filtratedDocs || docs.docs || [];
    if (event.keyCode == 13) {
      event.preventDefault();
      event.keyCode = 0;
      let doc = filtratedDocs[docs.hoverIndex] || filtratedDocs[0];
      if (!doc) return;
      docs.hoverIndex = filtratedDocs.indexOf(doc);
      this.$router.go(`/${docs.lang}/${doc.group}/${doc.name}`)
    } if (event.keyCode == 38) {
      event.preventDefault();
      event.keyCode = 0;
      let index = docs.hoverIndex - 1;
      docs.hoverIndex = index < 0 ? filtratedDocs.length - 1 : index;
    } else if (event.keyCode == 40) {
      event.preventDefault();
      event.keyCode = 0;
      let index = docs.hoverIndex + 1;
      docs.hoverIndex = index > filtratedDocs.length - 1 ? 0 : index;
    }
    event.target.focus();
  }

});

export default Hello;