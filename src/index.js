import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../node_modules/bulma/css/bulma.css'
ReactDOM.render(<App />, document.getElementById('root'));
// var head= document.getElementsByTagName('head')[0];
//    var script= document.createElement('link');
//    script.rel= 'stylesheet';
//    script.href= 'https://use.fontawesome.com/releases/v5.8.2/css/all.css';
//    script.integrity= "sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
//    script.crossorigin= "anonymous"
//    head.appendChild(script);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
