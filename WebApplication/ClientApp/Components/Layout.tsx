import * as React from 'react';
import { Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { UsersPage } from './Pages/UsersPage';
import { IAlert } from '../Models/IAlert';
import { Menu } from './Menu';
import { InlineKeysPage } from './Pages/InlineKeysPage';
import { InterviewsPage } from "./Pages/InterviewsPage";
import { MessagesPage } from "./Pages/MessagesPage";

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

	renderAlertBlock() {
		return this.state.alert ? (
			<div>
				<div className={"animated pulse alert" + this.state.alert.isError ? "alert-danger" : "warning"}>
					<h4>{this.state.alert.message}</h4>
				</div>
			</div>
		) : null;
	}

	render() {
		return <div className='container-fluid'>
			<div className='row'>
				<div className='col-sm-3'>
					<Menu/>
				</div>
				<div className='col-sm-9'>
					{this.renderAlertBlock()}
					<Route exact path='/'
						   render={() => <HomePage onError={(m) => this.onError(m)}
												   onAlert={(m) => this.onAlert(m)}/>}/>
					<Route path='/users'
						   render={() => <UsersPage onError={(m) => this.onError(m)}
													onAlert={(m) => this.onAlert(m)}/>}/>
					<Route path='/text-message-answers'
						   render={() => <MessagesPage onError={(m) => this.onError(m)}
																 onAlert={(m) => this.onAlert(m)}/>}/>
					<Route path='/inline-keys'
						   render={() => <InlineKeysPage onError={(m) => this.onError(m)}
																 onAlert={(m) => this.onAlert(m)}/>}/>
					<Route path='/interviews'
						   render={() => <InterviewsPage onError={(m) => this.onError(m)}
														 onAlert={(m) => this.onAlert(m)}/>}/>
				</div>
			</div>
		</div>;
	}
}
