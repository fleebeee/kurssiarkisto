import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
import Link from 'next/link';

import palette from '../../utils/palette.js';

const propTypes = {
  children: PropTypes.node,
};

const NavigationContainer = styled.div`
  margin-right: 15px;
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
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
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
          <ul
            className='dropdown-menu pull-right'
            aria-labelledby='dropdownMenu1'
          >
            <li><Link href='/'>Etusivu</Link></li>
            <li><Link href='/login'>Kirjaudu sisään</Link></li>
            <li><Link href='/signup'>Rekisteröidy</Link></li>
            <li role='separator' className='divider' />
            <li><Link href='/course'>Kurssi</Link></li>
            <li><Link href='/addcourse'>Lisää kurssi</Link></li>
            <li><Link href='/preferences'>Suosikit</Link></li>
            <li><Link href='/mypage'>Omat tiedot</Link></li>
          </ul>
        </div>
      </NavigationContainer>
    );
  }
}

Navigation.propTypes = propTypes;

export default Navigation;
