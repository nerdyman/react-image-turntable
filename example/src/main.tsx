import 'pepjs';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { Test } from './Test';

const isDebug = new URLSearchParams(window.location.search).get('debug') !== null;

ReactDOM.render(
  <React.StrictMode>{isDebug ? <Test /> : <App />}</React.StrictMode>,
  document.getElementById('root'),
);
