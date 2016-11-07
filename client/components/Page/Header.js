import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
import Head from 'next/head';

import Navigation from './Navigation.js';

global.jQuery = global.$ = require('jquery');

const propTypes = {
  children: PropTypes.node,
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #6A7C90;
`;

const Logo = styled.img`
  width: 80px;
  height: 75px;
  margin: 5px;
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <HeaderContainer>
        <Head>
          <title>Kurssiarkisto</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          {/* eslint-disable max-len */}
          <link rel='stylesheet' href='/static/css/bootstrap.min.css' />
          <link rel='stylesheet' href='/static/css/ionicons.min.css' />
          <script src='/static/js/jquery-3.1.1.min.js' />
          <script src='/static/js/bootstrap.min.js' />
          {/* eslint-enable max-len */}
        </Head>

        <Logo
          src='/static/images/logo-oranssi.png'
          alt='Kurssiarkisto logo'
        />
        <Navigation />
      </HeaderContainer>
    );
  }
}

Header.propTypes = propTypes;

export default Header;
