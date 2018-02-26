import React, { Component } from 'react';
import './App.css';
import Auth from './modules/Auth';
import Header from './components/Header.js';
import MyRoutes from './routes.js';

class App extends Component {
  constructor() {
    super()
    this.state={
      loggedInUserId: null
    }
    this.setLoggedInUser = this.setLoggedInUser.bind(this);
  }
  componentWillMount() {
    this.setState({
        loggedInUserId:Auth.getUserId()
    })
  }
  setLoggedInUser(userId) {
    this.setState({ loggedInUserId: userId });
  }
  render(){
    return (
      <div>
        <Header userId={ this.state.loggedInUserId } />
        {MyRoutes}
      </div>
    )
  }
}
export default App;
