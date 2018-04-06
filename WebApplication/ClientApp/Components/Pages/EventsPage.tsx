import * as React from 'react';
import { FormEvent } from 'react';
import { IBot } from '../../Models/IBot';
import { Preloader } from '../Domain/Preloader';
import { ILayoutCallbacks } from '../Layout';
import { BotSelector } from "../Domain/BotSelector";
import { IEvent } from '../../Models/IEvent';
import BotsApi from "../../ApiClient/BotsApi";
import EventsApi from "../../ApiClient/EventsApi";

interface IMessagesPageState {
	currentBotId: string;
	bots: IBot[];
	events: IEvent[];
	loading: boolean;
}

export class EventsPage extends React.Component<ILayoutCallbacks, IMessagesPageState> {
	constructor() {
		super();
		this.state = {currentBotId: '', bots: [], events: [], loading: false};
	}

	getData() {
		if (!this.state.loading) {
			this.setState({loading: true});
			BotsApi.getBots().then((bots: IBot[]) => {
				if (this.state.currentBotId == '') {
					this.setState({currentBotId: bots[ 0 ].id});
				}
				EventsApi.getEvents(this.state.currentBotId).then((events: IEvent[]) => {
					this.setState({
						loading: false,
						bots: bots,
						events: events
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
		this.setState({currentBotId: id});
		this.getData();
	}

	render() {
		return (
			<div>
				<h2> Events </h2>
				<hr/>
				{this.state.loading ? <Preloader/> : (
					<div>
						<BotSelector
							currentBotId={this.state.currentBotId}
							bots={this.state.bots}
							onChange={(id) => this.selectBot(id)}
						/>
						{this.renderContent()}
						{this.renderForm()}
					</div>
				)}
			</div>
		)
	}

	renderContent() {
		return (
			<div className="">
				<h3> Events </h3>
				<table className='table'>
					<thead>
					<tr>
						<th>Text</th>
						<th/>
					</tr>
					</thead>
					<tbody>
					{this.state.events.map(event =>
						<tr key={event.id}>
							<td>{event.text}</td>
							<td>
								<button onClick={(e) => this.handleRemoveButton(event.id)}
										className="btn btn-default">
									Remove
								</button>
							</td>
						</tr>
					)}
					</tbody>
				</table>
			</div>
		);
	}

	handleRemoveButton(id: string) {
		EventsApi.removeEvent(id).then(() => {
			this.getData();
		}).catch(error => {
			this.props.onError(error);
		});
	}

	handleSubmitForm(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		let textRef = this.refs.text as HTMLInputElement;
		let botId = this.state.currentBotId;

		if (textRef.value == '') {
			this.props.onAlert('Validation error');
		}

		EventsApi.addEvent(botId, textRef.value).then(() => {
			this.getData();
		}).catch(error => {
			this.props.onError(error);
		});
	}

	renderForm() {
		return (
			<div className="">
				<h3> Add </h3>
				<form role="form" onSubmit={(e) => this.handleSubmitForm(e)}>
					<div className="form-group">
						<label htmlFor="exampleInputText">
							Text
						</label>
						<input type="text" className="form-control" ref="text"/>
					</div>
					<button type="submit" className="btn btn-default">
						Submit
					</button>
				</form>
			</div>
		);
	}
}
