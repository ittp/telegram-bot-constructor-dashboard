import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IBot } from '../Models/IBot';
import { ApiClient } from '../Models/ApiClient';

interface IHomeState {
	bots: IBot[];
	error: string,
	loading: boolean;
}

export class Home extends React.Component<RouteComponentProps<{}>, IHomeState> {
	constructor() {
		super();
		this.state = {bots : [], error: '', loading: true};

		ApiClient.getBots().then(bots => {
			this.setState({bots, error: '', loading: false});
		}).catch(error => {
			this.setState({bots: [], error: error, loading: false});
		});
	}

	private static renderBots(bots: IBot[]) {
		return <table className='table'>
			<thead>
			<tr>
				<th>Name</th>
				<th>Token</th>
			</tr>
			</thead>
			<tbody>
			{bots.map(bot =>
				<tr key={bot.id}>
					<td>{bot.name}</td>
					<td>{bot.token}</td>
				</tr>
			)}
			</tbody>
		</table>;
	}

	public render() {
		let hasError = this.state.error != ''
			? <h4 className="page-error"> {"Error: " + this.state.error} </h4>
			: null;

		return <div>
			<h1>Bots</h1>
			{hasError}
			{this.state.loading ? <h4>Loading...</h4> : Home.renderBots(this.state.bots)}
		</div>;
	}
}
