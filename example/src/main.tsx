import 'pepjs';
import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import { Test } from './Test';

const isDebug = new URLSearchParams(window.location.search).get('debug') !== null;
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<React.StrictMode>{isDebug ? <Test /> : <App />}</React.StrictMode>);
