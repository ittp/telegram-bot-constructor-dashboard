import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './Components/Layout';
import { HomePage } from "./Components/Pages/HomePage";
import { UsersPage } from './Components/Pages/UsersPage';

export const Routes = <Layout>
	<Route exact path='/' component={HomePage}/>
	<Route path='/users' component={UsersPage}/>
</Layout>;
