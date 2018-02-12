import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './Components/Layout';
import { Home } from './Components/Home';
import { UsersPage } from './Components/UsersPage';

export const Routes = <Layout>
	<Route exact path='/' component={Home}/>
	<Route path='/users' component={UsersPage}/>
</Layout>;
