import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class Menu extends React.Component<{}, {}> {
	public render() {
		return <div className='main-nav animated fadeInLeft menu'>
			<div className='navbar navbar-inverse'>
				<div className='navbar-header'>
					<button type='button' className='navbar-toggle' data-toggle='collapse'
							data-target='.navbar-collapse'>
						<span className='sr-only'>Toggle navigation</span>
						<span className='icon-bar'/>
						<span className='icon-bar'/>
						<span className='icon-bar'/>
					</button>
					<Link className='navbar-brand' to={'/'}>Bot Constructor</Link>
				</div>
				<div className='clearfix'/>
				<div className='navbar-collapse collapse'>
					<ul className='nav navbar-nav'>
						<li>
							<NavLink to={'/'} exact activeClassName='active'>
								<span className='glyphicon glyphicon-send'/> Bots
							</NavLink>
						</li>
						<li>
							<NavLink to={'/text-message-answers'} activeClassName='active'>
								<span className='glyphicon glyphicon-comment'/> Messages
							</NavLink>
						</li>
						<li>
							<NavLink to={'/inline-keys'} activeClassName='active'>
								<span className='glyphicon glyphicon-th-list'/> Inline keys
							</NavLink>
						</li>
						<li>
							<NavLink to={'/events'} activeClassName='active'>
								<span className='glyphicon glyphicon-bullhorn'/> Events
							</NavLink>
						</li>
						<li>
							<NavLink to={'/interviews'} activeClassName='active'>
								<span className='glyphicon glyphicon-thumbs-up'/> Interviews
							</NavLink>
						</li>
						<li>
							<NavLink to={'/users'} activeClassName='active'>
								<span className='glyphicon glyphicon-user'/> Users
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>;
	}
}

