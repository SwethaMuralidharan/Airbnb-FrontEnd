import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';

class SignUpForm extends Component{
  constructor(){
    super();
    this.state={
        currentUsername:'',
        currentEmailid:'',
        currentPassword:''
    }
    this.onUsernameChange=this.onUsernameChange.bind(this);
    this.onEmailChange=this.onEmailChange.bind(this);
    this.onPasswordChange=this.onPasswordChange.bind(this);
    this.sendUserInfo=this.sendUserInfo.bind(this);
  }
  onUsernameChange(e){
    this.setState({
      currentUsername:e.target.value
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
    this.props.onFormSubmit(this.state.currentUsername, this.state.currentEmailid, this.state.currentPassword);
  }
    render(){
      return (
        <div className="container">
          <form action="/" onSubmit={ this.sendUserInfo }>
            <h2 className="card-heading">Sign Up</h2>

            {this.props.errors.summary && <p className="error-message">{this.props.errors.summary}</p>}

            <div className="form-group">
              <label>User Name</label>
              <input className="form-control"
                type="text"
                // errorText={this.props.errors.name}
                onChange={this.onUsernameChange}
                value={this.state.currentUsername}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input className="form-control"
                type="text"
                // errorText={this.props.errors.email}
                onChange={this.onEmailChange}
                value={this.state.currentEmailid}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input className="form-control"
                type="password"
                onChange={this.onPasswordChange}
                // errorText={this.props.errors.password}
                value={this.state.currentPassword}
              />
            </div>

            <div className="form-group">
              {/* <RaisedButton type="submit" label="Create New Account" primary /> */}
              <button type="submit" className="btn btn-primary">Create New Account</button>
            </div>

            {/* <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText> */}
              <div>Already have an account? <Link to={'/login'}>Log in</Link></div>
          </form>
        </div>
      )
    }
}
export default SignUpForm;
