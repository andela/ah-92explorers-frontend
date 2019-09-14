/* eslint-disable react/jsx-filename-extension */
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import './assets/scss/App.scss';
import './assets/css/App.css';
import './assets/css/bootstrap.min.css';
import './assets/css/animate.css';
import './assets/css/continue.css';
import './assets/css/notfound.css';
import './assets/css/stats.css';

render(<App />, document.getElementById('root'));
