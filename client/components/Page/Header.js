import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import { Button, DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';
import Head from 'next/head';

import Navigation from './Navigation.js';

const propTypes = {
  children: PropTypes.node,
};

const HeaderContainer = styled.div`
  display: flex;
  background-color: #6A7C90;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
`;

const NavigationContainer = styled.div`
  width: 100%;
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
          {/* eslint-disable max-len */}
          <link rel='stylesheet' href='/static/css/bootstrap.min.css' />
          <link rel='stylesheet' href='/static/css/bootstrap-theme.min.css' />
          {/* eslint-enable max-len */}
        </Head>

        <Logo
          src='/static/images/logo-oranssi.png'
          alt='Kurssiarkisto logo'
        />
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>

      </HeaderContainer>
    );
  }
}

Header.propTypes = propTypes;

export default Header;
