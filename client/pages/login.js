import React, { Component, PropTypes } from 'react';
import NotificationSystem from 'react-notification-system';

import AuthService from '../utils/AuthService';
import Page from '../components/Page/Page.js';

const auth = new AuthService('http://localhost:3003');


const propTypes = {
  url: PropTypes.object.isRequired,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.addToast = this.addToast.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (auth.loggedIn()) {
      console.debug('You are already logged in');
      // this.props.url.replaceTo('/');
    }
  }

  addToast(options) {
    this.notificationSystem.addNotification({
      title: options.title,
      message: options.message,
      level: options.level || 'success',
      position: 'tc',
    });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const res = await auth.login(this.state.email, this.state.password);
    console.debug('LOGIN:', res);
    if (res.success) {
      // Don't toast here because the user won't have time to read it
      // Toasts should be in 'App' but Next doesn't offer one
      this.props.url.pushTo('/');
    } else {
      this.addToast({
        title: 'Kirjautuminen epäonnistui',
        message: 'Väärä käyttäjätunnus tai salasana',
        level: 'error',
      });
    }
  }

  render() {
    return (
      <Page>
        <NotificationSystem ref={(c) => { this.notificationSystem = c; }} />
        <div>
          Kirjaudu sisään
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
      </Page>
    );
  }
}

Login.propTypes = propTypes;

export default Login;
