import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// https://kyleamathews.github.io/typography.js/
import Typography from 'typography';
import grandView from 'typography-theme-grand-view';
const typography = new Typography(grandView);
// export const { scale, rhythm, options } = typography
// export default typography
typography.injectStyles();


import '../style.scss';

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);