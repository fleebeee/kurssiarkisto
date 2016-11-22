import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
import Link from 'next/link';
import _ from 'lodash';

import AuthService from '../../utils/AuthService';
import palette from '../../utils/palette.js';
import globals from '../../utils/globals.js';

const auth = new AuthService(`${globals.API_ADDRESS}`);

const propTypes = {
  children: PropTypes.node,
};

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

const Nickname = styled.div`
  color: ${palette.white};
  font-size: 13px;
  margin-right: 10px;
`;

const Icon = styled.i`
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: ${palette.headerGrey};
  background-color: ${palette.white};
  font-size: 32px;
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 7px;

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  overflow: hidden;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: color, background-color;
  transition-property: color, background-color;

  &:hover {
    cursor: pointer;
    background-color: ${palette.orange};
    color: ${palette.white};
  }
`;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentDidMount() {
    this.setState({ user: auth.getProfile() });
  }

  render() {
    return (
      <NavigationContainer>

        <Nickname>
          {this.state.user.nickname}
        </Nickname>
        <div className='dropdown'>
          <div
            className='dropdown-toggle'
            id='dropdownMenu1'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='true'
          >
            <Icon className='ion-navicon' />
          </div>
          {
            _.isEmpty(this.state.user)
          ?
            <ul
              className='dropdown-menu pull-right'
              aria-labelledby='dropdownMenu1'
            >
              <li><Link href='/'>Search</Link></li>
              <li role='separator' className='divider' />
              <li><Link href='/login'>Log in</Link></li>
              <li><Link href='/signup'>Register</Link></li>
            </ul>
          :
            <ul
              className='dropdown-menu pull-right'
              aria-labelledby='dropdownMenu1'
            >
              <li><Link href='/'>Search</Link></li>
              <li><Link href='/addcourse'>Add course</Link></li>
              <li><Link href='/favorites'>Favorites</Link></li>
              <li><Link href='/mypage'>My page</Link></li>
              <li role='separator' className='divider' />
              <li><Link href='/logout'>Log out</Link></li>
            </ul>
          }
        </div>
      </NavigationContainer>
    );
  }
}

Navigation.propTypes = propTypes;

export default Navigation;
