import React from 'react';
import $ from 'jquery';
import { model } from 'mota';
import { host } from '../common/host';
import docs from '../models/Docs';
import './index.less';

const UPDATE_DELAY = 200;

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
    if (this.updateTimer) clearTimeout(this.updateTimer);
    this.updateTimer = setTimeout(() => {
      if (!this.updateTimer) return;
      console.log('event', 'showArticle');
      host.emit('showArticle', { model: this.model });
      this.handleLazyElements();
    }, UPDATE_DELAY);
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