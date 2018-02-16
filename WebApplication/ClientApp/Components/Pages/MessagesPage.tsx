import * as React from 'react';
import { ApiClient } from '../../Models/ApiClient';
import { FormEvent } from 'react';
import { IBot } from '../../Models/IBot';
import { Preloader } from '../Domain/Preloader';
import { ILayoutCallbacks } from '../Layout';
import { ITextMessageAnswer } from '../../Models/ITextMessageAnswer';
import { BotSelector } from "../Domain/BotSelector";

interface IMessagesPageState {
	currentBotId: string;
	bots: IBot[];
	textMessageAnswers: ITextMessageAnswer[];
	loading: boolean;
}

export class MessagesPage extends React.Component<ILayoutCallbacks, IMessagesPageState> {
	constructor() {
		super();
		this.state = {currentBotId: '', bots: [], textMessageAnswers: [], loading: false};
	}

	getData() {
		if (!this.state.loading) {
			this.setState({loading: true});
			ApiClient.getAsync('/api/bots').then((bots: IBot[]) => {
				if (this.state.currentBotId == '') {
					this.setState({currentBotId: bots[ 0 ].id});
				}
				ApiClient.getAsync('/api/text-message-answers', {botId: this.state.currentBotId}).then((textMessageAnswers: ITextMessageAnswer[]) => {
					this.setState({
						loading: false,
						bots: bots,
						textMessageAnswers: textMessageAnswers
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
				<h2> Messages </h2>
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
				<h3> Content </h3>
				<table className='table'>
					<thead>
					<tr>
						<th>Message</th>
						<th>Answer</th>
						<th/>
					</tr>
					</thead>
					<tbody>
					{this.state.textMessageAnswers.map(textMessageAnswer =>
						<tr key={textMessageAnswer.id}>
							<td>{textMessageAnswer.message}</td>
							<td>{textMessageAnswer.answer}</td>
							<td>
								<button onClick={(e) => this.handleRemoveButton(textMessageAnswer.id)}
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
		ApiClient.postAsync('/api/remove-text-message-answer', {id: id}).then(() => {
			this.getData();
		}).catch(error => {
			this.props.onError(error);
		});
	}

	handleSubmitForm(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		let messageRef = this.refs.message as HTMLInputElement;
		let answerRef = this.refs.answer as HTMLInputElement;
		let botId = this.state.currentBotId;

		if (messageRef.value == '' || answerRef.value == '') {
			this.props.onAlert('Validation error');
		}

		ApiClient.postAsync('/api/add-text-message-answer', {
			botId: botId,
			message: messageRef.value,
			answer: answerRef.value
		}).then(() => {
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
						<label htmlFor="exampleInputEmail1">
							Messsage
						</label>
						<input type="text" className="form-control" ref="message"/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">
							Answer
						</label>
						<input type="text" className="form-control" ref="answer"/>
					</div>
					<button type="submit" className="btn btn-default">
						Submit
					</button>
				</form>
			</div>
		);
	}
}
