import React from 'react';
import { Link } from '../common/router';
import { model } from 'mota';
import docs from '../models/Docs';
import './index.less';

@model(docs)
export class Catalog extends React.Component {

  renderDocs(group) {
    const { locale, doc } = this.model;
    return group.docs.map(item => {
      return <li className="doc-item" key={item.name}>
        <Link key={item.name}
          className={item.name == doc.name ? 'active' : ''}
          to={`/${locale.name}/${item.group}/${item.name}`}>
          {item.title}
        </Link>
      </li>;
    });
  }

  renderGroups() {
    const { groups } = this.model;
    return groups.map(item => {
      return <li className="group-item" key={item.name}>
        <a>
          <i className="fa fa-th-large" aria-hidden="true"></i>{item.text}
        </a>
        <ul className="doc">
          {this.renderDocs(item)}
        </ul>
      </li>;
    });
  }

  renderList() {
    const { keyword } = this.model;
    if (keyword) return;
    return <ul className="group" key="list">
      {this.renderGroups()}
    </ul>;
  }

  renderSearchItems() {
    const { filtratedDocs, locale, doc, hoverIndex } = this.model;
    return filtratedDocs.map((item, index) => {
      const active = item.name == doc.name ? 'active' : '';
      const hover = hoverIndex == index ? 'hover' : '';
      return <li className="doc-item" key={item.name}>
        <Link className={`${active} ${hover} `}
          to={`/${locale.name}/${item.group}/${item.name}`}>
          {item.title}
        </Link>
      </li>;
    });
  }

  renderSearchList() {
    const { keyword } = this.model;
    if (!keyword) return;
    return <ul className="group" key="search-list">
      <li className="group-item">
        <a>
          <i className="fa fa-search" aria-hidden="true"></i>
          {docs.keyword}
        </a>
        <ul className="doc">
          {this.renderSearchItems()}
        </ul>
      </li>
    </ul>;
  }

  render() {
    return <div className="catalog">
      {this.renderList()}
      {this.renderSearchList()}
    </div>;
  }

}