import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import AppRoute from './AppRoute';

import './styles/index.sass';

ReactDOM.render(
  <Router>
    <AppRoute />
  </Router>,
  document.getElementById('lfe-root')
);
