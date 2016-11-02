import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import ls from 'local-storage';

const propTypes = {
  url: PropTypes.object.isRequired,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
    this.state = { email: '', password: '' };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async logIn() {
    const res = await fetch('http://localhost:3003/auth/authenticate', {
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
    console.debug('logIn() response', data);
    return data;
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit() {
    const res = await this.logIn();

    if (!res) {
      console.debug('No answer from server');
    } else if (res.success) {
      // Save JWT to localstorage
      ls.set('jwt', res.token);
      console.debug('Successful login', res.token);
      // Redirect to front page
      this.props.url.pushTo('/');
    } else {
      console.debug('Invalid credentials');
    }
  }

  render() {
    return (
      <div>
        Hello World
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
        <button onClick={this.handleSubmit}>Log in</button>
      </div>
    );
  }
}

Login.propTypes = propTypes;

export default Login;
