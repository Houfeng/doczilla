import React from 'react';
import ReactDOM from 'react-dom';
import { host } from './common/host';
import { App } from './App';

import './common/bootstrap';
import 'font-awesome/css/font-awesome.css';
import 'github-markdown-css/github-markdown.css';
import './assets/common.less';

global.React = React;
global.ReactDOM = ReactDOM;
const root = document.getElementById('root');

ReactDOM.render(<App />, root, () => host.emit('start'));