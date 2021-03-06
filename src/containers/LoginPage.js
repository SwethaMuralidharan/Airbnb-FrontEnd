import React, { Component } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.js';


class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';
    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }
    this.state = {
      errors: {},
      successMessage,
    };
    this.processForm = this.processForm.bind(this);
  }
  processForm(loggedinEmail,loggedinPassword) {
    // create a string for an HTTP body message
    const email = encodeURIComponent(loggedinEmail);
    const password = encodeURIComponent(loggedinPassword);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', `${process.env.REACT_APP_BACKEND_URL}/auth/login`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          this.setState({
            errors: {}
          });
          console.log(xhr.response);
          Auth.authenticateUser(xhr.response.token);
          Auth.saveUserId(xhr.response.user.id);
          this.props.history.push(`/`);
        } else {
              const errors = xhr.response.errors ? xhr.response.errors : {};
              errors.summary = xhr.response.message;
              this.setState({
                errors
              });
        }
    });
    xhr.send(formData);
  }
  render() {
    return (
      <LoginForm
        onFormSubmit={this.processForm}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
      />
    );
  }
}
export default LoginPage;
