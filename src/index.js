import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

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

ReactDOM.render((
    <App name={params.name || '?'} period={params.period} responseEmail={params.responseEmail} />
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
