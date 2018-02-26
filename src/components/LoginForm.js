import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
          <div className="row">
            <div className="col-md-6 offset-md-3">
                <form action="/" onSubmit={this.sendLoggedInInfo}>
                    <h2 className="card-heading">Login</h2>

                    {this.props.successMessage && <p className="success-message">{this.props.successMessage}</p>}
                    {this.props.errors.summary && <p className="error-message alertmsg">{this.props.errors.summary}</p>}

                    <div className="form-group">
                      <label>Email</label>
                      <p className="error-message alertmsg">{this.props.errors.email}</p>
                      <input className="form-control"
                        type="text"
                        onChange={this.onEmailChange}
                        value={this.state.currentEmailid}
                      />
                    </div>

                  <div className="form-group">
                    <label>Password</label>
                    <p className="error-message alertmsg">{this.props.errors.password}</p>
                    <input className="form-control"
                      type="password"
                      onChange={this.onPasswordChange}
                      value={this.state.currentPassword}
                    />
                  </div>

                  <div className="form-group center-div">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>
                    <span>Don't have an account? <Link to={'/signup'}>Create one</Link></span>
                </form>
            </div>
          </div>
        </div>
      )
  }
}
export default LoginForm;
