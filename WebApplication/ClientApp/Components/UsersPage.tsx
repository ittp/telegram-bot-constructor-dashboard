import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

export class UsersPage extends React.Component<RouteComponentProps<{}>, {}> {
	constructor() {
		super();
	}

	public render() {
		return <div>
			<h1>Users</h1>
			<p>There is users</p>
		</div>;
	}
}
