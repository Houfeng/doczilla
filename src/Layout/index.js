import React from 'react';
import { Router, Route, Switch } from '../common/router';
import { model, watch, binding } from 'mota';
import docs from '../models/Docs';
import { Article } from '../Article';
import { Catalog } from '../Catalog';
import pkg from '../../package.json';

@model(docs)
@binding
export class Layout extends React.Component {

  renderHeader() {
    const locale = this.model.locale || {};
    return <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed"
        data-toggle="collapse"
        data-target="#bs-example-navbar-collapse-1"
        aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#">
        <i className="icon fa fa-graduation-cap" aria-hidden="true"></i>
        <span className="name">{locale.title || 'Doczilla'}</span>
      </a>
    </div>;
  }

  renderSearch() {
    const { locale } = this.model;
    return <form className="navbar-form navbar-left">
      <div className="form-group search">
        <span className="separator"></span>
        <input onKeyDown={this.onKeywordKeyDown}
          data-bind="keyword"
          type="text"
          className="form-control"
          placeholder={locale.search || 'Search by keyword ...'} />
      </div>
    </form>;
  }

  renderLinks() {
    const { links = [] } = this.model.locale;
    return links.map(item => (<li key={item.url}>
      <a href={item.url}>{item.text}</a>
    </li>));
  }

  renderLocales() {
    const { locales = [] } = this.model;
    return locales.map(item => (
      <li key={item.name}>
        <a href="javascript:;" onClick={() => this.switchLang(item.name)}>
          {item.text}
        </a>
      </li>
    ));
  }

  renderCollapse() {
    const { locale } = this.model;
    if (!locale) return;
    return <div className="collapse navbar-collapse"
      id="bs-example-navbar-collapse-1">
      {this.renderSearch()}
      <ul className="nav navbar-nav navbar-right">
        {this.renderLinks()}
        <li className="dropdown locales">
          <a href="javascript:;"
            className="dropdown-toggle"
            data-toggle="dropdown"
            role="button">
            {locale.text || ''} <span className="caret"></span>
          </a>
          <ul className="dropdown-menu">
            {this.renderLocales()}
          </ul>
        </li>
      </ul>
    </div>;
  }

  renderContainer() {
    return <div className="container">
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-3 col-side">
              <Switch>
                <Route path="/" component={Catalog} />
              </Switch>
            </div>
            <div className="col-md-9 col-main">
              <Switch>
                <Route path="/:lang/:gname/:dname" component={Article} />
                <Route path="/:lang/:gname" component={Article} />
                <Route path="/:lang" component={Article} />
                <Route path="/" component={Article} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  renderFooter() {
    return <footer className="footer">
      Powered By Doczilla v{pkg.version}
    </footer>;
  }

  renderStyles() {
    const { styles = [] } = this.model.assets;
    return styles.map(url => (
      <link key={url} href={url} rel="stylesheet" />
    ));
  }

  loadScripts() {
    const { scripts = [] } = this.model.assets;
    scripts.forEach(url => {
      const script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
    });
  }

  componentDidMount() {
    this.loadScripts();
  }

  render() {
    return <Router>
      <div>
        {this.renderStyles()}
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            {this.renderHeader()}
            {this.renderCollapse()}
          </div>
        </nav >
        {this.renderContainer()}
        {this.renderFooter()}
      </div >
    </Router>;
  }


  @watch(m => m.doc, true)
  updatePageTitle() {
    const { doc, locale } = this.model;
    if (!doc || !locale) return;
    document.title = `${doc.title} - ${locale.title}`;
  }

  switchLang = (lang) => {
    const { group, doc } = this.model;
    this.go(`/${lang}/${group.name}/${doc.name}`);
  }

  go = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  onKeywordKeyDown = (event) => {
    const filtratedDocs = this.model.filtratedDocs || this.model.docs || [];
    if (event.keyCode == 13) {
      event.preventDefault();
      event.keyCode = 0;
      const doc = filtratedDocs[docs.hoverIndex] || filtratedDocs[0];
      if (!doc) return;
      this.model.hoverIndex = filtratedDocs.indexOf(doc);
      this.go(`/${docs.lang}/${doc.group}/${doc.name}`);
    } else if (event.keyCode == 38) {
      event.preventDefault();
      event.keyCode = 0;
      const index = this.model.hoverIndex - 1;
      this.model.hoverIndex = index < 0 ? filtratedDocs.length - 1 : index;
    } else if (event.keyCode == 40) {
      event.preventDefault();
      event.keyCode = 0;
      const index = this.model.hoverIndex + 1;
      this.model.hoverIndex = index > filtratedDocs.length - 1 ? 0 : index;
    }
    event.target.focus();
  }

}