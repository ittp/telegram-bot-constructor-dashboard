import * as React from 'react';
import 'isomorphic-fetch';
import { ILayoutCallbacks } from '../Layout';

export class UsersPage extends React.Component<ILayoutCallbacks, {}> {
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
