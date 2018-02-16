import * as React from 'react';
import { IBot } from "../../Models/IBot";

export interface IBotSelectorProps{
	currentBotId: string;
	bots: IBot[];
	onChange: (id: string) => void;
}

export class BotSelector extends React.Component<IBotSelectorProps, {}> {
	constructor(){
		super();
	}

	handleSelect() {
		let selectedBotRef = this.refs.selectedBot as HTMLSelectElement;
		this.props.onChange(selectedBotRef.value);
	}

	render() {
		return (
			<div>
				<h3> Current bot </h3>
				<form action="">
					<select ref="selectedBot" value={this.props.currentBotId} className="form-control" onChange={() => this.handleSelect()} name="botId">
						{this.props.bots.map(bot =>
							<option value={bot.id}>{bot.name}</option>
						)}
					</select>
				</form>
			</div>
		)
	}
}
