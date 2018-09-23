import { Router, Route } from './common/router';
import { Layout } from './Layout';

export function App() {
  return <Router>
    <Route path="/" component={Layout} />
  </Router>;
}