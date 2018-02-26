import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm.js';

class SignUpPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
    };
    this.processForm = this.processForm.bind(this);
    // this.changeUser = this.changeUser.bind(this);
  }
  processForm(inputName, inputEmail, inputPassword,inputDob,inputGender,inputAddress) {
    // create a string for an HTTP body message
    const name = encodeURIComponent(inputName);
    const email = encodeURIComponent(inputEmail);
    const password = encodeURIComponent(inputPassword);
    const Dob=encodeURIComponent(inputDob);
    const Gender=encodeURIComponent(inputGender);
    const Address=encodeURIComponent(inputAddress);
    const formData = `name=${name}&email=${email}&password=${password}&dob=${Dob}&gender=${Gender}&address=${Address}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();

    xhr.open('post', `${process.env.REACT_APP_BACKEND_URL}/auth/signup`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        this.setState({
          errors: {}
        });
        localStorage.setItem('successMessage', xhr.response.message);
        this.props.history.push('/login');
      } else {
        //failure
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }
  // changeUser(event) {
  //   const field = event.target.name;
  //   const user = this.state.user;
  //   user[field] = event.target.value;
  //
  //   this.setState({
  //     user
  //   });
  // }
  render() {
    return (
      <SignUpForm
        onFormSubmit={this.processForm}
        errors={this.state.errors}
        // onChange={this.changeUser}
        // user={this.state.user}
      />
    );
  }
}
export default SignUpPage;
