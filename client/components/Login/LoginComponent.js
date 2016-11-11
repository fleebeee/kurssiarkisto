import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import AuthService from '../../utils/AuthService';
import palette from '../../utils/palette.js';

const auth = new AuthService('http://localhost:3003');

const propTypes = {
  url: PropTypes.object.isRequired,
  addToast: PropTypes.func.isRequired,
};

const LoginContainer = styled.div`
  display: block;
  padding: 20px 40px 20px 40px;
  color: white;
  background-color: ${palette.orange};
  border-radius: 10px;
`;

const Field = styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const LoginButton = styled.button`
  background-color: ${palette.headerGrey};
  border: none;
  color: ${palette.white};
  margin-top: 10px;
  align-self: flex-end;

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  overflow: hidden;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: color, background-color;
  transition-property: color, background-color;

  &:hover {
    background-color: ${palette.white};
    color: ${palette.black};
  }
`;

class LoginComponent extends Component {
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
      <LoginContainer>
        <h2>Kirjaudu sisään</h2>
        <Field
          className='form-control'
          type='text'
          placeholder='email'
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <Field
          className='form-control'
          type='password'
          placeholder='password'
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <ButtonContainer>
          <LoginButton
            className='btn btn-default'
            onClick={this.handleSubmit}
          >
            Kirjaudu sisään
          </LoginButton>
        </ButtonContainer>
      </LoginContainer>
    );
  }
}

LoginComponent.propTypes = propTypes;

export default LoginComponent;
