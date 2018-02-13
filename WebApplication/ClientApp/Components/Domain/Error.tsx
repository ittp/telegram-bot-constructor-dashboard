import * as React from 'react';

export interface IErrorProps{
	message: string
}

export class Error extends React.Component<IErrorProps, {}> {
	public render() {
		return (
			<div className="animated pulse alert alert-danger">
				<h4>{this.props.message}</h4>
			</div>
		);
	}
}
