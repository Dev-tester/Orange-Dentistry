import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Appoint from './Components/Appoints/Appoint';
import Logo from './Logo';
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