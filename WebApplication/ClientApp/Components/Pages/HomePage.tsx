import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IBot } from '../../Models/IBot';
import { ApiClient } from '../../Models/ApiClient';
import { Error } from '../Domain/Error';
import { Preloader } from '../Domain/Preloader';
import { FormEvent } from "react";
import { Alert } from "../Domain/Alert";

interface IHomeState {
	bots: IBot[];
	error: string,
	alert: string,
	loading: boolean;
}

interface IHomePageProps {
	onError: Function,
	onAlert: Function
}

export class HomePage extends React.Component<RouteComponentProps<IHomePageProps>, IHomeState> {
	constructor() {
		super();
		this.state = {bots: [], error: '', loading: false, alert: ''};
	}

	getData() {
		if (!this.state.loading) {
			this.setState(Object.assign(this.state, {loading: true}));
			ApiClient.get('/api/bots').then((bots: IBot[]) => {
				this.setState({bots: bots, error: '', loading: false, alert: ''});
			}).catch(error => {
				this.setState({bots: [], error: error, loading: false, alert: ''});
			});
		}
	}

	componentWillMount() {
		this.getData();
	}

	render() {
		if (this.state.loading) {
			return (
				<div>
					<h1>Bots: </h1>
					<Preloader/>
				</div>
			)
		}
		return (
			<div>
				<h1>Bots: </h1>
				{this.renderAlert()}
				{this.renderError()}
				{this.state.error == '' ? this.renderBots() : null}
				{this.state.error == '' ? this.renderForm() : null}
			</div>
		);
	}

	renderBots() {
		return <table className='table'>
			<thead>
			<tr>
				<th>Name</th>
				<th>Token</th>
				<th/>
			</tr>
			</thead>
			<tbody>
			{this.state.bots.map(bot =>
				<tr key={bot.id}>
					<td>{bot.name}</td>
					<td>{bot.token}</td>
					<td>
						<button onClick={(e)=> this.handleRemoveBot(bot.id)} className="btn btn-default">
							Remove
						</button>
					</td>
				</tr>
			)}
			</tbody>
		</table>;
	}

	handleRemoveBot(id: string){
		let data = new FormData();
		data.append('id', id);

		ApiClient.post('/api/remove-bot', data).then(() => {
			this.getData();
		}).catch(error => {
			this.setState({bots: [], error: error, loading: false, alert: ''});
		});
	}

	handleSubmitForm(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		let name = (this.refs.name as HTMLInputElement).value;
		let token = (this.refs.token as HTMLInputElement).value;

		if (name == '' || token == '') {
			return this.setState(Object.assign(this.state, {alert: 'Input error (TODO: Нужно будет проверять не только пустые поля)'}));
		}

		let data = new FormData();
		data.append('name', name);
		data.append('token', token);

		ApiClient.post('/api/add-bot', data).then(() => {
			this.getData();
		}).catch(error => {
			this.setState(Object.assign(this.state, {error: error}));
		});
	}

	renderForm() {
		return <div>
			<h2> Add bot </h2>
			<form role="form" onSubmit={(e) => this.handleSubmitForm(e)}>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">
						Name
					</label>
					<input type="text" className="form-control" ref="name"/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">
						Token
					</label>
					<input type="text" className="form-control" ref="token"/>
				</div>
				<button type="submit" className="btn btn-default">
					Submit
				</button>
			</form>
		</div>;
	}

	private renderAlert() {
		return (this.state.alert != '') ? <Alert message={this.state.alert}/> : null;
	}

	private renderError() {
		return (this.state.error != '') ? <Error message={this.state.error}/> : null;
	}
}