import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class SignUpForm extends Component{
  constructor(){
    super();
    this.state={
        currentUsername:'',
        currentEmailid:'',
        currentPassword:'',
        currentUserAddress:'',
        currentUserGender:'',
        currentUserDob:''
    }
    this.onUsernameChange=this.onUsernameChange.bind(this);
    this.onEmailChange=this.onEmailChange.bind(this);
    this.onPasswordChange=this.onPasswordChange.bind(this);
    this.sendUserInfo=this.sendUserInfo.bind(this);
    this.onUserAddressChange=this.onUserAddressChange.bind(this);
    this.onUserGenderChange=this.onUserGenderChange.bind(this);
    this.onUserDobChange=this.onUserDobChange.bind(this);
  }
  onUsernameChange(e){
    this.setState({
      currentUsername:e.target.value
    })
  }
  onUserAddressChange(e){
    this.setState({
      currentUserAddress:e.target.value
    })
  }
  onUserGenderChange(e){
    this.setState({
      currentUserGender:e.target.value
    })
  }
  onUserDobChange(e){
    this.setState({
      currentUserDob:e.target.value
    })
  }
  onEmailChange(e){
      this.setState({
        currentEmailid:e.target.value
      })
  }
  onPasswordChange(e){
    this.setState({
      currentPassword:e.target.value
    })
  }
  sendUserInfo(e){
    e.preventDefault();
    this.props.onFormSubmit(this.state.currentUsername, this.state.currentEmailid, this.state.currentPassword,this.state.currentUserDob,this.state.currentUserGender,this.state.currentUserAddress);
  }
    render(){
      return (
        <div className="container divpad">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form action="/" onSubmit={ this.sendUserInfo }>
                <h2 className="card-heading">Sign Up</h2>

                {this.props.errors.summary && <p className="error-message alertmsg">{this.props.errors.summary}</p>}

                <div className="form-group">
                  <label>User Name</label>
                  <p className="error-message alertmsg">{ this.props.errors.name }</p>
                  <input className="form-control"
                    type="text"
                    onChange={this.onUsernameChange}
                    value={this.state.currentUsername}
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <input className="form-control"
                    type="text"
                    onChange={this.onUserGenderChange}
                    value={this.state.currentUserGender}
                  />
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input className="form-control"
                    type="text"
                    onChange={this.onUserDobChange}
                    value={this.state.currentUserDob}
                    placeholder="YYYY-MM-DD"
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input className="form-control"
                    type="text"
                    onChange={this.onUserAddressChange}
                    value={this.state.currentUserAddress}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <p className="error-message alertmsg">{ this.props.errors.email }</p>
                  <input className="form-control"
                    type="text"
                    onChange={this.onEmailChange}
                    value={this.state.currentEmailid}
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <p className="error-message alertmsg">{ this.props.errors.password }</p>
                  <input className="form-control"
                    type="password"
                    onChange={this.onPasswordChange}
                    value={this.state.currentPassword}
                  />
                </div>

                <div className="form-group center-div">
                  <button type="submit" className="btn btn-primary">Create New Account</button>
                </div>

                <div>Already have an account? <Link to={'/login'}>Log in</Link></div>
              </form>
            </div>
          </div>
        </div>
      )
    }
}
export default SignUpForm;
