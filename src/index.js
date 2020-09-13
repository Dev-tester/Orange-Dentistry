import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Appoint from './Components/Appoints/Appoint';
import App from './App';
import Logo from './Logo';
import * as serviceWorker from './serviceWorker';
function ge(element){
    return (typeof element == "string" || typeof element == "number") ? document.getElementById(element) : element;
}
if (ge('root-appoint') || true) {
    ReactDOM.render(
        <React.StrictMode>
            <Appoint/>
        </React.StrictMode>,
        document.getElementById('root-appoint')
    );
}
else if (ge('root-logo')) {
    ReactDOM.render(
        <React.StrictMode>
            <Logo/>
        </React.StrictMode>,
        document.getElementById('root-logo')
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
