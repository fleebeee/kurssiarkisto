import React, { Component, PropTypes } from 'react';

import AuthService from '../utils/AuthService';
import withToast from '../utils/withToast.js';
import Page from '../components/Page/Page.js';

const auth = new AuthService('http://localhost:3003');


const propTypes = {
  url: PropTypes.object.isRequired,
  addToast: PropTypes.func.isRequired,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
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
      // TODO You can trigger a toast with a query parameter
      // e.g. /?loginSuccess=true
      this.props.url.pushTo('/');
    } else {
      this.props.addToast({
        title: 'Kirjautuminen epäonnistui',
        message: 'Väärä käyttäjätunnus tai salasana',
        level: 'error',
      });
    }
  }

  render() {
    return (
      <Page>
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

export default withToast(Login);
