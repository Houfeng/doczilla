import React from 'react';
import $ from 'jquery';
import sleep from '../common/sleep';
import { model, watch } from 'mota';
import { host } from '../common/host';
import docs from '../models/Docs';
import './index.less';

@model(docs)
export class Article extends React.Component {

  render() {
    const { doc } = this.model;
    if (!doc) return <span>...</span>;
    return <div className={`article markdown-body`}
      dangerouslySetInnerHTML={{ __html: doc.result }} >
    </div>;
  }

  async showArticle() {
    const { setLocation } = this.model;
    const { lang = '', gname = '', dname = '' } = this.props.match.params;
    await setLocation(lang, gname, dname);
    host.emit('showArticle', { lang, gname, dname, model: this.model });
  }

  componentDidMount() {
    this.showArticle();
    this.handleLazyElements();
  }

  componentDidUpdate() {
    this.showArticle();
  }

  async handleLazyElements() {
    await sleep(300);
    let lazyElements = $('[x-src],[data-src]');
    lazyElements.each(function () {
      let element = $(this);
      element.on('load', () => {
        element.addClass('loaded');
      });
      let src = element.attr('x-src') || element.attr('data-src');
      element.attr('src', src);
    });
  }

}