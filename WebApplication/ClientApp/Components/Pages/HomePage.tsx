import * as React from 'react';
import { ApiClient } from '../../Models/ApiClient';
import { FormEvent } from 'react';
import { IBot } from '../../Models/IBot';
import { Preloader } from '../Domain/Preloader';
import { ILayoutCallbacks } from '../Layout';

interface IHomePageState {
	bots: IBot[];
	loading: boolean;
}

export class HomePage extends React.Component<ILayoutCallbacks, IHomePageState> {
	constructor() {
		super();
		this.state = {bots: [], loading: false};
	}

	getData() {
		if (!this.state.loading) {
			this.setState({loading: true});
			ApiClient.getAsync('/api/bots').then((bots: IBot[]) => {
				this.setState({bots: bots, loading: false});
			}).catch(error => {
				this.props.onError(error);
			});
		}
	}

	componentWillMount() {
		this.getData();
	}

	render() {
		let title = (<h2> Bots </h2>);
		if (this.state.loading) {
			return (
				<div>
					{title}
					<hr/>
					<Preloader/>
				</div>
			)
		}
		return (
			<div>
				{title}
				<hr/>
				{this.renderContent()}
				{this.renderForm()}
			</div>
		);
	}

	renderContent() {
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
						<button onClick={(e) => this.handleRemoveButton(bot.id)} className="btn btn-default">
							Remove
						</button>
					</td>
				</tr>
			)}
			</tbody>
		</table>;
	}

	handleRemoveButton(id: string) {
		ApiClient.postAsync('/api/remove-bot', {id: id}).then(() => {
			this.getData();
		}).catch(error => {
			this.props.onError(error);
		});
	}

	handleSubmitForm(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		let nameRef = this.refs.name as HTMLInputElement;
		let tokenRef = this.refs.token as HTMLInputElement;

		if (nameRef.value == '' || tokenRef.value == '') {
			this.props.onAlert('Validation error');
		}

		ApiClient.postAsync('/api/add-bot', {name: nameRef.value, token: tokenRef.value}).then(() => {
			this.getData();
		}).catch(error => {
			this.props.onError(error);
		});
	}

	renderForm() {
		return (
			<div>
				<h3> Add </h3>

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
			</div>
		);
	}
}
