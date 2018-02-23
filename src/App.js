import React, { Component } from 'react';
// import ReactDom from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './routes.js';
import './App.css';
import { Switch, Route} from 'react-router';
import Header from './components/Header.js';
import HomePage from './components/HomePage.js';
import DashboardPage from './containers/DashboardPage.js';
import LoginPage from './containers/LoginPage.js';
import SignUpPage from './containers/SignUpPage.js';
import MainSearchPage from './components/MainSearchPage.js';
import Profile from './components/Profile.js';
import Rental from './components/Rental.js';
import Auth from './modules/Auth';
import PostRentalForm from './components/PostRentalForm.js';
import RentalSearchPage from './components/RentalSearchPage.js';

class App extends Component {
  constructor() {
    super()
    this.state={
      loggedInUserId: null
    }

    this.setLoggedInUser = this.setLoggedInUser.bind(this);
  }

  componentWillMount() {
  // if user id is null, get it from local Storage
    this.setState({
        loggedInUserId:Auth.getUserId()
    })
}
  setLoggedInUser(userId) {
    this.setState({ loggedInUserId: userId });
  }

  render(){
    const MyLoginPage = (props) => {
      return (
        <LoginPage
          banana={this.setLoggedInUser}
          {...props}
        />
      );
    }

    return (
      <div>
        <Header userId={ this.state.loggedInUserId } />
        {/* <MainSearchPage userId={ this.state.loggedInUserId }/> */}
        <Switch>
          <Route exact path='/' component={ MainSearchPage }/>
          <Route path='/signup' component={ SignUpPage }/>
          <Route path='/login' render={ MyLoginPage } />
          <Route path='/dashboard' component={ DashboardPage }/>
          <Route path='/home' component={ HomePage}/>
          <Route path='/user/:user_id' component={ Profile }/>
          <Route path='/users/:user_id/rentals/:rental_id' component={ Rental }/>
          <Route path='/users/:user_id/rentals' component={ PostRentalForm }/>
          <Route path='/search/:searchTerm' component={ RentalSearchPage }/>
        </Switch>
      </div>
    )
  }
}

export default App;
