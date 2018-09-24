import * as rd from 'react-router-dom';
import { normalize } from 'path';
import conf from '$config';

//计算 conf
const defConf = { mode: 'hash', baseUri: '', extname: '.html' };
const docConf = (() => {
  const { mode, baseUri } = (global.DOC_DATA || {});
  return { mode, baseUri };
})();
const routeConf = Object.assign(defConf, conf.router, docConf, global.router);
if (conf.env === 'dev') Object.assign(routeConf, conf.router);

const Switch = rd.Switch;
const Router = {
  hash: rd.HashRouter,
  browser: rd.BrowserRouter,
  static: rd.StaticRouter,
}[routeConf.mode] || rd.HashRouter;

const Route = {
  hash: rd.Route,
  static: rd.Route,
  browser: props => {
    const { path, children, ...others } = props;
    const { baseUri } = routeConf;
    return <rd.Route {...others} path={normalize(`/${baseUri}/${path}`)} >
      {children}
    </rd.Route>;
  },
}[routeConf.mode] || rd.Route;

const Link = {
  hash: rd.Link,
  static: props => {
    const { to, children, ...others } = props;
    const { extname } = routeConf;
    const href = normalize(`./${to}${to != '/' ? extname : ''}`);
    return <a {...others} href={href} >
      {children}
    </a>;
  },
  browser: props => {
    const { to, children, ...others } = props;
    const { baseUri, extname } = routeConf;
    const href = normalize(`/${baseUri}/${to}${to != '/' ? extname : ''}`);
    return <rd.Link {...others} to={href}>
      {children}
    </rd.Link>;
  },
}[routeConf.mode] || rd.Link;

const go = routeConf.mode === 'static' ? (to) => {
  const { extname } = routeConf;
  const href = normalize(`./${to}${to != '/' ? extname : ''}`);
  location.href = href;
} : null;

export { routeConf, Router, Route, Switch, Link, go };