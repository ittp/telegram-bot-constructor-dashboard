import * as React from 'react';
import { IBot } from '../../Models/IBot';
import { Preloader } from '../Domain/Preloader';
import { ILayoutCallbacks } from '../Layout';
import { IInterview } from '../../Models/IInterview';
import { IInterviewAnswer } from "../../Models/IInterviewAnswer";
import { BotSelector } from "../Domain/BotSelector";
import { IUser } from "../../Models/IUser";
import BotsApi from "../../ApiClient/BotsApi";
import InterviewsApi from "../../ApiClient/InterviewsApi";
import UsersApi from "../../ApiClient/UsersApi";
import InterviewAnswersApi from "../../ApiClient/InterviewAnswersApi";

interface IInterviewsPageState {
	currentBotId: string;
	bots: IBot[];
	users: IUser[];
	interviews: IInterview[];
	interviewAnswers: IInterviewAnswer[];
	loading: boolean;
	answersCount: number;
}

export class InterviewsPage extends React.Component<ILayoutCallbacks, IInterviewsPageState> {
	answersRefs: any[];

	constructor() {
		super();
		this.answersRefs = [];
		this.state = {
			currentBotId: '',
			bots: [],
			interviews: [],
			interviewAnswers: [],
			users: [],
			loading: false,
			answersCount: 1
		};
	}

	getData() {
		if (!this.state.loading) {
			this.setState({ loading: true });
			BotsApi.getBots().then((bots: IBot[]) => {
				if (this.state.currentBotId == '') {
					this.setState({ currentBotId: bots[0].id });
				}
				InterviewsApi.getInterviews(this.state.currentBotId).then((interviews: IInterview[]) => {
					InterviewAnswersApi.getInterviewAnswers(this.state.currentBotId).then((interviewAnswers: IInterviewAnswer[]) => {
						UsersApi.getUsers(this.state.currentBotId).then((users: IUser[]) => {
							this.setState({
								loading: false,
								bots,
								interviews,
								interviewAnswers,
								users
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
		this.setState({ currentBotId: id });
		this.getData();
	}

	render() {
		return (
			<div>
				<h2> Interviews </h2>
				<hr />
				{this.state.loading ? <Preloader /> : (
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
			<div className="">
				<h3> Content </h3>
				<table className='table'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Question</th>
							<th>Answers</th>
							<th />
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
									<button onClick={() => this.handleRemoveKey(interview.id)}
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
		InterviewsApi.removeInterview(id).then(() => {
			this.getData();
		}).catch(error => {
			this.props.onError(error);
		});
	}

	handleSubmitForm() {
		let nameRef = this.refs.name as HTMLInputElement;
		let questionRef = this.refs.question as HTMLInputElement;
		let botId = this.state.currentBotId;
		let answersRefs = this.answersRefs.filter(x => x != null) as HTMLInputElement[];
		let answers = answersRefs.map(x => x.value);

		if (questionRef.value == '' || answers.filter(x => x == '').length > 0 || nameRef.value == '') {
			this.props.onAlert('Validation error');
		}

		InterviewsApi.addInterview(botId, questionRef.value, nameRef.value, JSON.stringify(answersRefs.map(x => x.value))).then(() => {
			this.setState({
				answersCount: 0
			});
			this.getData();
		}).catch(error => {
			this.props.onError(error);
		});
	}

	handleAddAnswerKey() {
		this.setState({ answersCount: this.state.answersCount + 1 });
	}

	handleRemoveAnswerKey() {
		this.setState({ answersCount: this.state.answersCount > 1 ? this.state.answersCount - 1 : 1 });
	}

	renderAnswerInputs() {
		this.answersRefs = [];
		let answerInputs = [];
		for (let i = 0; i < this.state.answersCount; i++) {
			answerInputs.push(
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">
						Answer({i + 1})
					</label>
					<input type="text" className="form-control" ref={(input) => {
						this.answersRefs.push(input)
					}} />
				</div>
			);
		}
		return answerInputs;
	}

	renderForm() {
		return (
			<div className="">
				<h3> Add </h3>
				<form role="form">
					<div className="form-group">
						<label htmlFor="exampleInputEmail1">
							Name
						</label>
						<input type="text" className="form-control" ref="name" />
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">
							Question
						</label>
						<input type="text" className="form-control" ref="question" />
					</div>
					{this.renderAnswerInputs()}
					<div className="form-group">
						<button type="button" className="btn btn-default answer-button"
							onClick={() => this.handleAddAnswerKey()}
						>
							Add answer
						</button>
						<button type="button" className="btn btn-default answer-button"
							onClick={() => this.handleRemoveAnswerKey()}>
							Remove answer
						</button>
						<button type="button" className="btn btn-default answer-button"
							onClick={() => this.handleSubmitForm()}>
							Submit
						</button>
					</div>
				</form>
			</div>
		);
	}

	getAnswerView(answer: IInterviewAnswer) {
		let user = this.state.users.find(x => x.telegramId === answer.userId) as IUser;
		let interview = this.state.interviews.find(x => x.id === answer.interviewId) as IInterview;

		return { user: user, answer: answer, interview: interview };
	}

	renderAnswers() {
		return (
			<div className="">
				<h3> Answers </h3>
				<table className='table'>
					<thead>
						<tr>
							<th>First name</th>
							<th>Last name</th>
							<th>Telegram Id</th>
							<th>Question</th>
							<th>Answer</th>
							<th />
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
