import * as React from 'react';

export interface ILayoutCallbacks {
	onError: (message: string) => void;
	onAlert: (message: string) => void;
}

export class SingInPage extends React.Component<{}, {}> {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="signin">
				<div className="text-center">
					<form className="form-signin">
						<img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt=""
							 width="72"
							 height="72"/>
						<h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
						<label htmlFor="inputEmail" className="sr-only">Email address</label>
						<input type="email" id="inputEmail" className="form-control" placeholder="Email address"
							   required
							   autoFocus/>
						<label htmlFor="inputPassword" className="sr-only">Password</label>
						<input type="password" id="inputPassword" className="form-control" placeholder="Password"
							   required/>
						<button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
					</form>
				</div>
			</div>
		);
	}
}




