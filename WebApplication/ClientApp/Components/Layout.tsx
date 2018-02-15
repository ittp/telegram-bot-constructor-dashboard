import * as React from 'react';
import { Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { UsersPage } from './Pages/UsersPage';
import { IAlert } from '../Models/IAlert';

export interface ILayoutState {
	alert?: IAlert;
}

export interface ILayoutCallbacks {
	onError: (message: string) => void;
	onAlert: (message: string) => void;
}

export class Layout extends React.Component<{}, ILayoutState> {
	constructor() {
		super();
		this.state = {};
	}

	onAlert(message: string) {
		this.setState(prevState => ({alert: {message: message, isError: false}}));
	}

	onError(message: string) {
		this.setState(prevState => ({alert: {message: message, isError: true}}));
	}

	render() {
		let alertBlock = this.state.alert ? (
			<div>
				<div className={"animated pulse alert" + this.state.alert.isError ? "alert-danger" : "warning"}>
					<h4>{this.state.alert.message}</h4>
				</div>
			</div>
		) : null;

		return (<div>
				{alertBlock}
				<Route exact path='/' render={() => <HomePage onError={(m) => this.onError(m)} onAlert={(m) => this.onAlert(m)}/>}/>
				<Route path='/users' render={()=> <UsersPage onError={(m) => this.onError(m)} onAlert={(m) => this.onAlert(m)}/>}/>
			</div>
		);
	}
}
