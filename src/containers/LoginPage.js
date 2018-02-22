import React, { Component } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.js';


class LoginPage extends Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(loggedinEmail,loggedinPassword) {
    // create a string for an HTTP body message
    const email = encodeURIComponent(loggedinEmail);
    const password = encodeURIComponent(loggedinPassword);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:8080/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          this.setState({
            errors: {}
          });
          console.log(xhr.response);
          Auth.authenticateUser(xhr.response.token);
          Auth.saveUserId(xhr.response.user.id)

          this.props.banana(xhr.response.user.id)
          this.props.history.push(`/user/${xhr.response.user.id}`);
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

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onFormSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
      />
    );
  }

}


export default LoginPage;
