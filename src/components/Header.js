import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Auth from '../modules/Auth';
import { withRouter } from 'react-router-dom';
import '../App.css';

class Header extends Component{
  constructor(){
      super();
      this.logoutUser=this.logoutUser.bind(this);
  }
  logoutUser(e){
    Auth.deauthenticateUser();
    this.props.history.push("/")
  }
  render(){
    return(
          <div className="header">
            <div className="container">
              <div className="row">
                <div className="col-md-3 offset-md-3">
                    <h2>
                      <Link to="/">
                        <img src="https://cdn-images-1.medium.com/max/1600/1*B_7Z8Zxbb2Mu6JjXpMrmYQ.png" alt="airbnb" height="120" width="150"/>
                      </Link>
                    </h2>
                </div>
                {Auth.isUserAuthenticated() ? (
                  <div className="col-md-3 divpad">
                      <Link className="btn btn-primary" to={`/users/${Auth.getUserId()}`}>Profile</Link>&nbsp;
                      <button className="btn btn-primary" onClick={this.logoutUser}>Logout</button>
                  </div>
                ):(
                  <div className="col-md-3 divpad">
                      <Link className="btn btn-primary" to="/login">Login</Link>&nbsp;
                      <Link className="btn btn-primary" to="/signup">Signup</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
    )
  }
}


export default withRouter(Header);
