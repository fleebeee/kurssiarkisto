import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';

import Page from '../components/Page/Page.js';
import palette from '../utils/palette.js';

const propTypes = {
  url: PropTypes.object.isRequired,
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: ${palette.white};
  background-color: ${palette.orange};
  border-radius: 10px;
  padding: 20px;
  width: 100%;
`;

const TrackText = styled.span`
  color: ${palette.titleGrey}
  font-size: 1em;
`;

const Label = styled.label`
  display: block;
  margin-top: 8px;
  margin-bottom: 4px;
  color: ${palette.white};
  text-transform: uppercase;
  font-size: 0.7em;
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
    const res = await fetch('http://localhost:3003/auth/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        // Optional
        role: this.state.role,
        track: this.state.track !== 'Ei valintaa' ? this.state.track : null,
        startingYear: this.state.startingYear,
        nickname: this.state.nickname,
      }),
    });
    const data = await res.json();
    console.debug('signUp() response', data);
    return data;
  }

  handleTextChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  handleTrackChange(value) {
    this.setState({ track: value });
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
      <Page>
        <Content>
          <div>
            <h2>Rekisteröidy</h2>
            <Label>sähköposti</Label>
            <input
              className='form-control'
              id='email'
              type='text'
              placeholder='email'
              value={this.state.email}
              onChange={this.handleTextChange.bind(this, 'email')}
            />
            <Label>salasana</Label>
            <input
              className='form-control'
              id='password'
              type='password'
              placeholder='password'
              value={this.state.password}
              onChange={this.handleTextChange.bind(this, 'password')}
            />
            <h4>Valinnaiset kentät</h4>
            <Label>opintolinja</Label>
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
                  {this.state.track || 'Ei valintaa'}&nbsp;
                </TrackText>
                <span className='caret' />
              </button>
              <ul
                className='dropdown-menu'
                aria-labelledby='trackDropdown'
              >
                {
                  ['Ei valintaa', 'TUO', 'TIK', 'INF', 'AUT', 'BTT', 'ENE',
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
            <Label>rooli</Label>
            <input
              className='form-control'
              id='role'
              type='text'
              placeholder='rooli'
              value={this.state.role}
              onChange={this.handleTextChange.bind(this, 'role')}
            />
            <Label>opintojen aloitusvuosi</Label>
            <input
              className='form-control'
              id='startingYear'
              type='text'
              placeholder='opintojen aloitusvuosi'
              value={this.state.startingYear}
              onChange={this.handleTextChange.bind(this, 'startingYear')}
            />
            <Label>lempinimi</Label>
            <input
              className='form-control'
              id='nickname'
              type='text'
              placeholder='lempinimi'
              value={this.state.nickname}
              onChange={this.handleTextChange.bind(this, 'nickname')}
            />
          </div>
          <RegisterButton
            className='btn btn-default'
            onClick={this.handleSubmit}
          >
            Rekisteröidy
          </RegisterButton>
        </Content>
      </Page>
    );
  }
}

Signup.propTypes = propTypes;

export default Signup;
