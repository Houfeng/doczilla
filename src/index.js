import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from './common/router';
import { Layout } from './Layout';
import { host } from './common/host';
import './common/bootstrap';
import 'font-awesome/css/font-awesome.css';
import 'github-markdown-css/github-markdown.css';
import './assets/common.less';

function App() {
  return <Router>
    <Route path="/" component={Layout} />
  </Router>
}

render(<App />, document.getElementById('root'), () => {
  host.emit('start');
});
