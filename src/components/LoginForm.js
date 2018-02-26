import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Card, CardText } from 'material-ui/Card';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';


class LoginForm extends Component{
    constructor(){
      super();
      this.state={
        currentEmailid:'',
        currentPassword:''
      }
      this.onEmailChange=this.onEmailChange.bind(this);
      this.onPasswordChange=this.onPasswordChange.bind(this);
      this.sendLoggedInInfo=this.sendLoggedInInfo.bind(this);
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
  sendLoggedInInfo(e){
    e.preventDefault();
    this.props.onFormSubmit(this.state.currentEmailid,this.state.currentPassword);
  }
    render(){
      return (
        <div className="container divpad">
          <form action="/" onSubmit={this.sendLoggedInInfo}>
            <h2 className="card-heading">Login</h2>

            {this.props.successMessage && <p className="success-message">{this.props.successMessage}</p>}
            {this.props.errors.summary && <p className="error-message">{this.props.errors.summary}</p>}

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
              {/* <RaisedButton type="submit" label="Log in" primary /> */}
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
              {/*<CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText> */}
              <span>Don't have an account? <Link to={'/signup'}>Create one</Link></span>
          </form>
        </div>
      )
    }
}


export default LoginForm;
