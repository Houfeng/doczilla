import React from 'react';
import $ from 'jquery';
import sleep from '../common/sleep';
import { model } from 'mota';
import { host } from '../common/host';
import docs from '../models/Docs';
import './index.less';

@model(docs)
export class Article extends React.Component {

  render() {
    const { doc } = this.model;
    if (!doc) return <span>...</span>;
    return <div className={'article markdown-body'}
      dangerouslySetInnerHTML={{ __html: doc.result }} >
    </div>;
  }

  async showArticle() {
    const { setLocation } = this.model;
    const { lang = '', gname = '', dname = '' } = this.props.match.params;
    const updateKey = `${lang}/${gname}/${dname}`;
    if (updateKey === this.updateKey) return;
    this.updateKey = updateKey;
    await setLocation(lang, gname, dname);
    await sleep(0);
    host.emit('showArticle', { lang, gname, dname, model: this.model });
  }

  componentDidMount() {
    this.showArticle();
    this.handleLazyElements();
  }

  componentDidUpdate() {
    this.showArticle();
    this.handleLazyElements();
  }

  async handleLazyElements() {
    await sleep(100);
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