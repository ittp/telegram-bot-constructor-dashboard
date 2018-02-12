import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { IUser as User } from '../Models/IUser';

interface FetchDataExampleState {
	users: User[];
	loading: boolean;
}

export class UsersPage extends React.Component<RouteComponentProps<{}>, FetchDataExampleState> {
	constructor() {
		super();
		this.state = {users: [], loading: true};

		fetch('http://bot-constrcutor-api.azurewebsites.net/api/users?botId=5a804789734d1d0d42e9d31f', {mode: "no-cors"})
			.then(res => { console.log(res.status); console.dir(res.body); res.json()})
			.then(function (data) {
				console.log('Request succeeded with JSON response', data);
			})
			.catch(function (error) {
				console.log('Request failed', error);
			});	//this.setState({users: [], loading: false});

	}

	public render() {
		let contents = this.state.loading
			? <p><em>Loading...</em></p>
			: UsersPage.renderForecastsTable(this.state.users);

		return <div>
			<h1>Users</h1>
			<p>Get users from http://bot-constrcutor-api.azurewebsites.net</p>
			{contents}
		</div>;
	}

	private static renderForecastsTable(users: User[]) {
		return <table className='table'>
			<thead>
			<tr>
				<th>Telegram id</th>
				<th>Fist name</th>
				<th>Last name</th>
				<th>User name</th>
				<th>Bot id</th>
			</tr>
			</thead>
			<tbody>
			{users.map(user =>
				<tr key={user.id}>
					<td>{user.telegramId}</td>
					<td>{user.firstName}</td>
					<td>{user.lastName}</td>
					<td>{user.userName}</td>
					<td>{user.botId}</td>
				</tr>
			)}
			</tbody>
		</table>;
	}
}
