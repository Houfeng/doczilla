import React from 'react';
import $ from 'jquery';
import sleep from '../common/sleep';
import { model } from 'mota';
import { host } from '../common/host';
import docs from '../models/Docs';
import './index.less';

const UPDATE_DELAY = 100;

@model(docs)
export class Article extends React.Component {

  render() {
    const { doc } = this.props;
    if (!doc) return <span>...</span>;
    return <div className={'article markdown-body'}
      dangerouslySetInnerHTML={{ __html: doc.result }} >
    </div>;
  }

  componentDidMount() {
    this.onUpdate();
  }

  componentDidUpdate() {
    this.onUpdate();
  }

  async onUpdate() {
    await sleep(UPDATE_DELAY);
    host.emit('showArticle', { model: this.model });
    console.log('event', 'showArticle');
    this.handleLazyElements();
  }

  async handleLazyElements() {
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