import React from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom';
import LoginPage from './containers/LoginPage.js';
import SignUpPage from './containers/SignUpPage.js';
import MainSearchPage from './components/MainSearchPage.js';
import Profile from './components/Profile.js';
import Rental from './components/Rental.js';
import PostRentalForm from './components/PostRentalForm.js';
import RentalSearchPage from './components/RentalSearchPage.js';
import BookingSummary from './components/BookingSummary';


export default (
	<Switch>
		<Route exact path='/' component={ MainSearchPage }/>
		<Route path='/signup' component={ SignUpPage }/>
		<Route path='/login' component={LoginPage } />
		<Route path='/users/:user_id/bookings' component={ BookingSummary }/>
		<Route path='/users/:user_id/rentals/:rental_id' component={ Rental }/>
		<Route path='/users/:user_id/rentals' component={ PostRentalForm }/>
		<Route path='/users/:user_id' component={ Profile }/>
		<Route path='/search/:searchTerm' component={ RentalSearchPage }/>
	</Switch>
)
