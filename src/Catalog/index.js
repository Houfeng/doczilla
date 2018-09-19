import React from 'react';
import { model } from 'mota';
import docs from '../models/Docs';
import './index.less';

@model(docs)
export class Catalog extends React.Component {

  go = (doc) => {
    const { locale, docs, filtratedDocs } = this.model;
    if (this.model.keyword) {
      this.model.hoverIndex = filtratedDocs.indexOf(doc);
    } else {
      this.model.hoverIndex = docs.indexOf(doc);
    }
    const path = `/${locale.name}/${doc.group}/${doc.name}`;
    const { history } = this.props;
    history.push(path);
  }

  renderDocs(group) {
    const { doc } = this.model;
    return group.docs.map(item => {
      return <li className="doc-item" key={item.name}>
        <a className={item.name == doc.name ? 'active' : ''}
          onClick={() => this.go(item)}>
          {item.title}
        </a>
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
    return <ul className="group">
      {this.renderGroups()}
    </ul>;
  }

  renderSearchItems() {
    const { filtratedDocs, doc, hoverIndex } = this.model;
    return filtratedDocs.map((item, index) => {
      const active = item.name == doc.name ? 'active' : '';
      const hover = hoverIndex == index ? 'hover' : '';
      return <li className="doc-item" key={item.name}>
        <a className={`${active} ${hover}`} >
          {item.title}
        </a>
      </li>;
    });
  }

  renderSearchList() {
    const { keyword } = this.model;
    if (!keyword) return;
    return <ul className="group">
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