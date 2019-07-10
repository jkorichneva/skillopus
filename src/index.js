import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App';
import Result from './Result/Result';

import * as serviceWorker from './serviceWorker';

import results from './data/results';

import './index.css';

export default function getUrlParams() {
    const params = window.location.search.slice(1).split('&');

    return params.reduce((result, param) => {
        const [key, value] = param.split('=');
        return Object.assign(result, {
            [key]: decodeURIComponent(value).replace('+', ' '),
        });
    }, {});
}
const params = getUrlParams();

if (params.result) {
    ReactDOM.render((
        <Result values={results} />
    ), document.getElementById('root'));
} else {
    ReactDOM.render((
        <App name={params.name || '?'} period={params.period} responseEmail={params.responseEmail}/>
    ), document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
