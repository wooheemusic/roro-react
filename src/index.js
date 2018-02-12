import React from 'react';
import ReactDOM from 'react-dom';
// React Default Modules
import { Provider } from 'react-redux'
// Redux For React

import store from './core/store'
// Custom Store For Redux

import 'bootstrap/dist/css/bootstrap.css'
import './styles/core.scss'
// CSS Lib

import App from './App'
import registerServiceWorker from './registerServiceWorker'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();

