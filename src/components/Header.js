import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Auth from '../modules/Auth';
import { Route, withRouter } from 'react-router-dom';

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
          <div>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                    <h2>
                      {/* <strong>Airbnb</strong> */}
                      <Link to="/">
                        <img src={require('./airbnb-image.png')} alt="airbnb" height="120" width="175"/>
                      </Link>
                    </h2>
                </div>
                {Auth.isUserAuthenticated() ? (
                  <div className="col-md-4 divpad">
                      <button className="btn btn-primary">View Profile</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button className="btn btn-primary" onClick={this.logoutUser}>Logout</button>
                  </div>
                ):(
                  <div className="col-md-4 divpad">
                      <Link className="btn btn-primary" to="/login">Login</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
