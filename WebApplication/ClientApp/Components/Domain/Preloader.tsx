import * as React from 'react';

export class Preloader extends React.Component<{}, {}> {
	public render() {
		return (
			<div className="text-center">
				<div className="preloader"/>
			</div>
		);
	}
}
