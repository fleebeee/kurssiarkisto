import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';

import withToast from '../utils/withToast.js';
import Page from '../components/Page/Page.js';
import palette from '../utils/palette.js';
import globals from '../utils/globals.js';

const propTypes = {
  url: PropTypes.object.isRequired,
  addToast: PropTypes.func.isRequired,
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: ${palette.white};
  background-color: ${palette.yellow};
  border-radius: 10px;
  padding: 20px;
  margin: 5%;
`;

const RegisterText = styled.h2`
  text-transform: uppercase;
  padding-bottom: 20px;
`;

const TrackText = styled.span`
  color: ${palette.titleGrey}
  font-size: 1em;
`;

const OptionalText = styled.h4`
  text-transform: uppercase;
  padding-top: 20px;
  color: ${palette.headerGrey}
`;

const Label = styled.label`
  display: block;
  margin-top: 8px;
  margin-bottom: 4px;
  color: ${palette.white};
  text-transform: uppercase;
  font-size: 0.9em;
  font-weight: 500;
`;

const RegisterButton = styled.button`
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

class Signup extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.state = {
      email: '',
      password: '',
      role: '',
      track: '',
      startingYear: '',
      nickname: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async signUp() {
    const res = await fetch(`${globals.API_ADDRESS}/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: this.state.nickname,
        email: this.state.email,
        password: this.state.password,
        // Optional
        role: this.state.role,
        track: this.state.track !== 'n/a' ? this.state.track : null,
        startingYear: this.state.startingYear,
      }),
    });
    const data = await res.json();

    return data;
  }

  handleTextChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  handleTrackChange(value) {
    this.setState({ track: value });
  }

  async handleSubmit() {
    if (!this.state.nickname) {
      this.props.addToast({
        title: 'Register failed',
        message: 'Nickname is required',
        level: 'warning',
      });
      return;
    }

    if (!this.state.password) {
      this.props.addToast({
        title: 'Register failed',
        message: 'Password is required',
        level: 'warning',
      });
      return;
    }

    if (!this.state.nickname) {
      this.props.addToast({
        title: 'Register failed',
        message: 'Nickname is required',
        level: 'warning',
      });
      return;
    }

    const res = await this.signUp();

    if (!res) {
      // No response from server
      return;
    } else if (res.success) {
      // Redirect to front page
      this.props.url.pushTo('/login.js');
    } else {
      this.props.addToast({
        title: 'Register failed',
        message: 'Username or email could already be in use',
        level: 'error',
      });
    }
  }

  render() {
    return (
      <Page>
        <Content>
          <div>
            <RegisterText>Register</RegisterText>
            <OptionalText>Mandatory fields</OptionalText>
            <Label>nickname</Label>
            <input
              className='form-control'
              id='nickname'
              key='nickname'
              type='text'
              placeholder='nickname'
              value={this.state.nickname}
              onChange={this.handleTextChange.bind(this, 'nickname')}
            />
            <Label>email</Label>
            <input
              className='form-control'
              id='email'
              type='text'
              placeholder='email'
              value={this.state.email}
              onChange={this.handleTextChange.bind(this, 'email')}
            />
            <Label>password</Label>
            <input
              className='form-control'
              id='password'
              type='password'
              placeholder='password'
              value={this.state.password}
              onChange={this.handleTextChange.bind(this, 'password')}
            />
            <OptionalText>Optional fields</OptionalText>
            <Label>Department</Label>
            <div className='dropdown'>
              <button
                className='btn btn-xs btn-default dropdown-toggle'
                type='button'
                id='dropdownMenu'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='true'
              >
                <TrackText>
                  {this.state.track || 'n/a'}&nbsp;
                </TrackText>
                <span className='caret' />
              </button>
              <ul
                className='dropdown-menu'
                aria-labelledby='trackDropdown'
              >
                {
                  ['n/a', 'TUO', 'TIK', 'INF', 'AUT', 'BTT', 'ENE',
                    'KON', 'TFM', 'RYM', 'RRT', 'BIO', 'EST', 'ARK'].map(
                  option =>
                    <li key={option}>
                      <a
                        tabIndex='0'
                        onClick={() => this.handleTrackChange(option)}
                      >
                        {option}
                      </a>
                    </li>
                  )
                }
              </ul>
            </div>
            <Label>role</Label>
            <input
              className='form-control'
              id='role'
              type='text'
              placeholder='student / teacher / course staff'
              value={this.state.role}
              onChange={this.handleTextChange.bind(this, 'role')}
            />
            <Label>first year of studies</Label>
            <input
              className='form-control'
              id='startingYear'
              type='text'
              placeholder='2010 / 2011 / 2012...'
              value={this.state.startingYear}
              onChange={this.handleTextChange.bind(this, 'startingYear')}
            />
          </div>
          <br />
          <p> By registering you agree to our terms and rules. </p>
          <RegisterButton
            className='btn btn-default'
            onClick={this.handleSubmit}
          >
            Register
          </RegisterButton>
        </Content>
      </Page>
    );
  }
}

Signup.propTypes = propTypes;

export default withToast(Signup);
