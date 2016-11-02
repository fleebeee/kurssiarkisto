import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';

const propTypes = {
  url: PropTypes.object.isRequired,
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.state = { email: '', password: '' };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async signUp() {
    const res = await fetch('http://localhost:3003/api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });
    const data = await res.json();
    console.debug('signUp() response', data);
    return data;
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit() {
    const res = await this.signUp();

    if (!res) {
      console.debug('No answer from server');
    } else if (res.success) {
      console.debug('Successful sign up');
      // Redirect to front page
      this.props.url.pushTo('/');
    } else {
      console.debug('Invalid sign up');
    }
  }

  render() {
    return (
      <div>
        Rekisteröidy
        <input
          type='text'
          placeholder='email'
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <input
          type='password'
          placeholder='password'
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <button onClick={this.handleSubmit}>Sign up</button>
      </div>
    );
  }
}

Signup.propTypes = propTypes;

export default Signup;
