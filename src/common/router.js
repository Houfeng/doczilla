import {
  HashRouter,
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  Link
} from 'react-router-dom';

const conf = require('$config');
const Router = conf.router === 'browser' ? BrowserRouter : HashRouter;

export { Router, Route, Switch, NavLink, Link };
