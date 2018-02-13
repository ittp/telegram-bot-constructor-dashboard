import * as React from 'react';

export interface IErrorProps{
	message: string
}

export class Alert extends React.Component<IErrorProps, {}> {
	public render() {
		return (
			<div className="animated pulse alert alert-warning">
				<h4>{this.props.message}</h4>
			</div>
		);
	}
}
