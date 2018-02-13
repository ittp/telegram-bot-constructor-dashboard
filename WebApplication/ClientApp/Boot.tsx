import './Styles/site.css';
import './Styles/animate.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import * as LayoutModule from './Components/Layout';
import { ReactNode } from "react";

let Layout = LayoutModule.Layout;

function renderApp() {
	const baseUrl = document.getElementsByTagName('base')[ 0 ].getAttribute('href')!;
	ReactDOM.render(
		<AppContainer>
			<BrowserRouter basename={baseUrl}>
				<Layout/>
			</BrowserRouter>
		</AppContainer>,
		document.getElementById('react-app')
	);
}

renderApp();

if (module.hot) {
	module.hot.accept('./Components/Layout', () => {
		Layout = require<any>('./Components/Layout').Layout;
		renderApp();
	});
}
