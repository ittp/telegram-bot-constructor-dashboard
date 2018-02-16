import * as React from 'react';
import { ApiClient } from '../../Models/ApiClient';
import { FormEvent } from 'react';
import { IBot } from '../../Models/IBot';
import { Preloader } from '../Domain/Preloader';
import { ILayoutCallbacks } from '../Layout';
import { IInterview } from '../../Models/IInterview';
import { IInterviewAnswer } from "../../Models/IInterviewAnswer";
import { BotSelector } from "../Domain/BotSelector";
import { IUser } from "../../Models/IUser";

interface IInterviewsPageState {
	currentBotId: string;
	bots: IBot[];
	users: IUser[];
	interviews: IInterview[];
	interviewAnswers: IInterviewAnswer[];
	loading: boolean;
}

export class InterviewsPage extends React.Component<ILayoutCallbacks, IInterviewsPageState> {
	constructor() {
		super();
		this.state = {currentBotId: '', bots: [], interviews: [], interviewAnswers: [], users: [], loading: false};
	}

	getData() {
		if (!this.state.loading) {
			this.setState({loading: true});
			ApiClient.getAsync('/api/bots').then((bots: IBot[]) => {
				if (this.state.currentBotId == '') {
					this.setState({currentBotId: bots[ 0 ].id});
				}
				ApiClient.getAsync('/api/interviews', {botId: this.state.currentBotId}).then((interviews: IInterview    []) => {
					ApiClient.getAsync('/api/interview-answers', {botId: this.state.currentBotId}).then((interviewAnswers: IInterviewAnswer[]) => {
						ApiClient.getAsync('/api/users', {botId: this.state.currentBotId}).then((users: IUser[]) => {
							this.setState({
								loading: false,
								bots: bots,
								interviews: interviews,
								interviewAnswers: interviewAnswers,
								users: users
							});
						}).catch(error => this.props.onError(error));
					}).catch(error => this.props.onError(error));
				}).catch(error => this.props.onError(error));
			}).catch(error => this.props.onError(error));
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
				<h2> Interviews </h2>
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
						{this.renderAnswers()}
					</div>
				)}
			</div>
		)
	}

	renderContent() {
		return (
			<div className="animated fadeIn">
				<h3> Content </h3>
				<table className='table'>
					<thead>
					<tr>
						<th>Name</th>
						<th>Question</th>
						<th>Answers</th>
						<th/>
					</tr>
					</thead>
					<tbody>
					{this.state.interviews.map(interview =>
						<tr key={interview.id}>
							<td>{interview.name}</td>
							<td>{interview.question}</td>
							<td>
								<ul>{interview.answers.map(answer =>
									<li>{answer}</li>
								)}</ul>
							</td>
							<td>
								<button onClick={(e) => this.handleRemoveKey(interview.id)}
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

	handleRemoveKey(id: string) {
		ApiClient.postAsync('/api/remove-interview', {id: id}).then(() => {
			this.getData();
		}).catch(error => {
			this.props.onError(error);
		});
	}

	handleSubmitForm(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		let captionRef = this.refs.caption as HTMLInputElement;
		let answerRef = this.refs.answer as HTMLInputElement;
		let botId = this.state.currentBotId;

		if (captionRef.value == '' || answerRef.value == '') {
			this.props.onAlert('Validation error');
		}

		ApiClient.postAsync('/api/add-interview', {
			botId: botId,
			caption: captionRef.value,
			answer: answerRef.value
		}).then(() => {
			this.getData();
		}).catch(error => {
			this.props.onError(error);
		});
	}

	handleAddKey() {

	}

	renderForm() {
		return (
			<div className="animated fadeIn">
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
							Question
						</label>
						<input type="text" className="form-control" ref="question"/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">
							Answer(1)
						</label>
						<input type="text" className="form-control" ref="answer1"/>
					</div>
					<div className="form-group">
						<button onClick={() => this.handleAddKey()}
								className="btn btn-default">
							Add answer
						</button>
					</div>
					<button type="submit" className="btn btn-default">
						Submit
					</button>
				</form>
			</div>
		);
	}

	getAnswerView(answer: IInterviewAnswer) {
		let user = this.state.users.find(x => x.telegramId === answer.userId) as IUser;
		let interview = this.state.interviews.find(x => x.id === answer.interviewId) as IInterview;

		return {user: user, answer: answer, interview: interview};
	}

	renderAnswers() {
		return (
			<div className="animated fadeIn">
				<h3> Answers </h3>
				<table className='table'>
					<thead>
					<tr>
						<th>First name</th>
						<th>Last name</th>
						<th>Telegram Id</th>
						<th>Question</th>
						<th>Answer</th>
						<th/>
					</tr>
					</thead>
					<tbody>
					{this.state.interviewAnswers.map(answer => {
						let answerView = this.getAnswerView(answer);
						return (
							<tr key={answer.id}>
								<td>{answerView.user.firstName}</td>
								<td>{answerView.user.lastName}</td>
								<td>{answerView.user.telegramId}</td>
								<td>{answerView.interview.question}</td>
								<td>{answerView.answer.answer}</td>
							</tr>
						);
					})}
					</tbody>
				</table>
			</div>
		);
	}
}
