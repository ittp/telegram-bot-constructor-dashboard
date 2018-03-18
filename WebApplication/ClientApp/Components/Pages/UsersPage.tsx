import * as React from 'react';
import { ApiClient } from '../../Models/ApiClient';
import { IBot } from '../../Models/IBot';
import { Preloader } from '../Domain/Preloader';
import { ILayoutCallbacks } from '../Layout';
import { IUser } from '../../Models/IUser';
import { BotSelector } from "../Domain/BotSelector";

interface IUsersPageState {
	currentBotId: string;
	bots: IBot[];
	users: IUser[];
	loading: boolean;
}

export class UsersPage extends React.Component<ILayoutCallbacks, IUsersPageState> {
	constructor() {
		super();
		this.state = { currentBotId: '', bots: [], users: [], loading: false };
	}

	getData() {
		if (!this.state.loading) {
			this.setState({ loading: true });

			ApiClient.getBots().then((bots: IBot[]) => {
				if (this.state.currentBotId == '') {
					this.setState({ currentBotId: bots[0].id });
				}
				ApiClient.getUsers(this.state.currentBotId).then((users: IUser[]) => {
					this.setState({
						loading: false, bots: bots, users: users
					});
				}).catch(error => {
					this.props.onError(error);
				});
			}).catch(error => {
				this.props.onError(error);
			});
		}
	}

	componentWillMount() {
		this.getData();
	}

	selectBot(id: string) {
		this.setState({ currentBotId: id });
		this.getData();
	}

	render() {
		return (
			<div>
				<h2> Users </h2>
				<hr />
				{this.state.loading ? <Preloader /> : (
					<div>
						<BotSelector
							currentBotId={this.state.currentBotId}
							bots={this.state.bots}
							onChange={(id) => this.selectBot(id)}
						/>
						{this.renderContent()}
					</div>
				)}
			</div>
		)
	}

	renderContent() {
		return (
			<div className="">
				<h3> Content </h3>
				<table className='table'>
					<thead>
						<tr>
							<th>Telegram Id</th>
							<th>First name</th>
							<th>Last name</th>
							<th>User name</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{this.state.users.map(user =>
							<tr key={user.id}>
								<td>{user.telegramId}</td>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.userName}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}
