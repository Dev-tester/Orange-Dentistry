import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Appoint from './Components/Appoints/Appoint';
import './index.css';
import * as serviceWorker from './serviceWorker';
function ge(element) {
	return (typeof element == "string" || typeof element == "number") ? document.getElementById(element) : element;
}
if (ge('root-appoint') || true) {
	ReactDOM.render(
		<BrowserRouter>
			<React.StrictMode>
				<Appoint />

			</React.StrictMode>
		</BrowserRouter>,
		document.getElementById('root-appoint')
	);
}
else { }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
