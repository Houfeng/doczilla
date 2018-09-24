import { Router, Route, Switch } from './common/router';
import { Layout } from './Layout';

export function InnerApp() {
  return <Switch>
    <Route path="/:lang/:gname/:dname"
      component={Layout} exact />
    <Route path="/:lang/:gname" component={Layout} exact />
    <Route path="/:lang" component={Layout} exact />
    <Route path="/" component={Layout} exact />
  </Switch>;
}

export function App() {
  return <Router><InnerApp /></Router>;
}