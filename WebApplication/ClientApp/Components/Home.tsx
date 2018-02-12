import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IBot } from "../Models/IBot";

interface IHomeState {
	bots: IBot[];
	loading: boolean;
	error: any
}

export class Home extends React.Component<RouteComponentProps<{}>, IHomeState> {
	constructor() {
		super();
		this.state = {bots: [], loading: true, error: null};

		let apiUrl = 'http://localhost:3000/';
		let self = this;

		fetch(apiUrl + 'api/bots', {mode: "no-cors"})
			.then(res => {
				console.log(res.status);
				if (res.status != 200) {
					self.setState((prevState => {
						prevState.error = "Faled to get data from " + apiUrl;
						prevState.loading = false;
					}));
				}
				res.json().then(data => {
					console.log(data);
					self.state = {bots: data as IBot[], loading: false, error: null};
				}).catch(error => {
					self.state = {bots: [], loading: false, error: error};
				});
			})
			.catch(error => {
				self.state = {bots: [], loading: false, error: error};
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
		console.log(this.state.error);

		let hasError = this.state.error != null
			? <h4 className="page-error"> { "Error: " + this.state.error} </h4>
			: null;

		let contents = this.state.loading
			? <h4>Loading...</h4>
			: Home.renderBots(this.state.bots);

		return <div>
			<h1>Bots</h1>
			{hasError}
			{contents}
		</div>;
	}
}
