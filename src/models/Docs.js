function includes(content, keyword) {
  if (!content) return false;
  keyword = keyword.toLowerCase();
  content = content.toLowerCase();
  return content.indexOf(keyword) > -1;
}

export class Docs {

  data = {};
  assets = {};
  lang = '';
  gname = '';
  dname = '';
  locales = [];
  locale = {};
  links = [];
  groups = [];
  group = {};
  docs = [];
  doc = {};
  keyword = '';
  hoverIndex = 0;

  constructor() {
    this.data = global.DOC_DATA || {};
    this.locales = this.data.locales || [];
    this.assets = this.data.assets || {};
  }

  get filtratedDocs() {
    let result = [];
    if (!this.keyword) return [];
    this.groups.forEach(group => {
      group.docs.forEach(doc => {
        if (doc.title && doc.source &&
          includes(`${doc.title}*${doc.source}`, this.keyword)) {
          doc.group = group.name;
          result.push(doc);
        }
      });
    });
    return result;
  }

  getBaseInfo = () => {
    if (!global.document) return {};
    const baseElement = document.getElementsByTagName('base')[0];
    if (!baseElement) return {};
    const routeInfo = baseElement.getAttribute('route');
    if (!routeInfo) return {};
    return JSON.parse(decodeURIComponent(routeInfo));
  }

  setLocation = (lang, gname, dname) => {
    const baseInfo = this.getBaseInfo();
    this.lang = lang || baseInfo.locale || '';
    this.gname = gname || baseInfo.group || '';
    this.dname = (dname || baseInfo.doc || '').split('.')[0];
    if (!this.locales) return;
    this.locale = this.locales.find(item => item.name == this.lang) ||
      this.locales[0];
    if (!this.locale) return;
    this.links = this.locale.links;
    this.groups = this.locale.groups;
    this.group = this.groups.find(item => item.name == this.gname) ||
      this.groups[0];
    if (!this.group) return;
    this.docs = this.group.docs;
    this.doc = this.docs.find(item => item.name == this.dname) ||
      this.docs[0] || {};
  }
}

export default new Docs();