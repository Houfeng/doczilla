import React from 'react';
import { model } from 'mota';
import { host } from '../common/host';
import docs from '../models/Docs';
import './index.less';

const SHOW_DELAY = 300;

@model(docs)
export class Article extends React.Component {

  render() {
    const { doc } = this.props;
    if (!doc) return <span>...</span>;
    this.setPageTitle();
    return <div className={'article markdown-body'}
      dangerouslySetInnerHTML={{ __html: doc.result }} >
    </div>;
  }

  componentDidMount() {
    this.onShow();
  }

  componentDidUpdate() {
    this.onShow();
  }

  async onShow() {
    if (this.updateTimer) clearTimeout(this.updateTimer);
    this.updateTimer = setTimeout(() => {
      const event = { model: this.model };
      host.emit('showDoc', event);
      host.emit('showArticle', event);
    }, SHOW_DELAY);
  }

  setPageTitle() {
    const { doc, locale } = this.model;
    if (!doc || !locale || !global.document) return;
    document.title = `${doc.title} - ${locale.title}`;
  }

}