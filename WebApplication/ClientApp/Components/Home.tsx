import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IBot } from "../Models/IBot";


interface IHomeState {
	bots: IBot[];
	error: string
}

async function getBots(): Promise<any> {
	return new Promise((resolve, reject)=>{
		fetch('/api/bots', {mode: "no-cors"}).then(response => {
			if (response.status != 200) {
				reject('Cant get data. Response status: ' + response.status);
			}
			response.json().then(data => {
				resolve(data as IBot[]);
			});
		});
	});
}

export class Home extends React.Component<RouteComponentProps<{}>, IHomeState> {
	constructor() {
		super();
		this.state = {bots : [], error: ''};

		getBots().then(bots => {
			this.setState({bots, error: ''});
		}).catch(error => {
			this.setState({bots: [], error: error});
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

		let hasError = this.state.error != ''
			? <h4 className="page-error"> {"Error: " + this.state.error} </h4>
			: null;

		return <div>
			<h1>Bots</h1>
			{hasError}
			{Home.renderBots(this.state.bots)}
		</div>;
	}
}
