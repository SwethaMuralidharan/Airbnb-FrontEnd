import React from 'react';
import Header from './components/Header.js';
import HomePage from './components/HomePage.js';
import DashboardPage from './containers/DashboardPage.js';
import LoginPage from './containers/LoginPage.js';
import SignUpPage from './containers/SignUpPage.js';
import MainSearchPage from './components/MainSearchPage.js';
import Profile from './components/Profile.js';
// import Auth from './modules/Auth';
import { Switch, Route } from 'react-router-dom';

export default (
	<Switch>
    <Route exact path='/' component={ MainSearchPage }/>
		<Route path='/signup' component={ SignUpPage }/>
		<Route path='/login' component={ LoginPage }/>
    <Route path='/dashboard' component={ DashboardPage }/>
    <Route path='/home' component={ HomePage}/>
    <Route path='/user/:user_id' component={ Profile }/>
  </Switch>
)

// const routes = {
//   // base component (wrapper for the whole application).
//   component: Base,
//   childRoutes: [
//
//     {
//       path: '/',
//       getComponent: (location, callback) => {
//         if (Auth.isUserAuthenticated()) {
//           callback(null, DashboardPage);
//         } else {
//           callback(null, HomePage);
//         }
//       }
//     },
//
//     {
//       path: '/login',
//       component: LoginPage
//     },
//
//     {
//       path: '/signup',
//       component: SignUpPage
//     },
//
//     {
//       path: '/logout',
//       onEnter: (nextState, replace) => {
//         Auth.deauthenticateUser();
//
//         // change the current URL to /
//         replace('/');
//       }
//     }
//
//   ]
// };
//
// export default routes;
