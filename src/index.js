/* eslint-disable react/jsx-filename-extension */
import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './assets/scss/App.scss';
import './assets/css/App.css';

render(<App />, document.getElementById('root'));
