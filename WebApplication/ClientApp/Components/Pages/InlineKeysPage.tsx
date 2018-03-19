import * as React from 'react';
import { ApiClient } from '../../Models/ApiClient';
import { FormEvent } from 'react';
import { IBot } from '../../Models/IBot';
import { Preloader } from '../Domain/Preloader';
import { ILayoutCallbacks } from '../Layout';
import { IInlineKey } from '../../Models/IInlineKey';
import { BotSelector } from "../Domain/BotSelector";

interface IInlineKeysPageState {
	currentBotId: string;
	bots: IBot[];
	inlineKeys: IInlineKey[];
	loading: boolean;
}

export class InlineKeysPage extends React.Component<ILayoutCallbacks, IInlineKeysPageState> {
	constructor() {
		super();
		this.state = { currentBotId: '', bots: [], inlineKeys: [], loading: false };
	}

	getData() {
		if (!this.state.loading) {
			this.setState({ loading: true });
			ApiClient.getBots().then((bots: IBot[]) => {
				if (this.state.currentBotId == '') {
					this.setState({currentBotId: bots[ 0 ].id});
				}
				ApiClient.getInlineKeys(this.state.currentBotId).then((inlineKeys: IInlineKey[]) => {
					this.setState({
						loading: false, bots: bots, inlineKeys: inlineKeys
					});
				})
			})
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
				<h2> Inline keys </h2>
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
							<th />
						</tr>
					</thead>
					<tbody>
						{this.state.inlineKeys.map(inlineKey =>
							<tr key={inlineKey.id}>
								<td>{inlineKey.caption}</td>
								<td>{inlineKey.answer}</td>
								<td>
									<button onClick={(e) => this.handleRemoveKey(inlineKey.id)}
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
		ApiClient.removeInlineKey(id).then(() => {
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

		ApiClient.addInlineKey(botId,captionRef.value,answerRef.value
		).then(() => {
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
							Caption
						</label>
						<input type="text" className="form-control" ref="caption" />
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">
							Answer
						</label>
						<input type="text" className="form-control" ref="answer" />
					</div>
					<button type="submit" className="btn btn-default">
						Submit
					</button>
				</form>
			</div>
		);
	}
}
