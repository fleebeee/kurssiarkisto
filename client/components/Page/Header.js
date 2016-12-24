import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
import Link from 'next/prefetch';

import globals from '../../utils/globals.js';
import palette from '../../utils/palette.js';
import Navigation from './Navigation.js';
import isLoggedIn from '../../utils/isLoggedIn.js';

const propTypes = {
  children: PropTypes.node,
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${palette.headerGrey};
`;

const PageTitle = styled.div`
  font-family: 'Raleway', Helvetica, sans serif;
  font-weight: 600;
  color: ${palette.white};
  font-size: 1.5em;
  text-transform: uppercase;
  position: absolute;
  left: 50%;
  vertical-align: center;
  transform: translate(-50%);
  @media (max-width: ${globals.XS_BREAKPOINT}) {
    display: none;
  }
`;

const Logo = styled.img`
  height: 12vh;
  margin: 5px;
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    // Check if user is logged in
    this.setState({ loggedIn: isLoggedIn() });
  }

  render() {
    return (
      <HeaderContainer>
        <Link href='/'>
          <Logo
            src='/static/images/logo-oranssi.png'
            alt='Kurssiarkisto logo'
          />
        </Link>
        <PageTitle>Kurssiarkisto</PageTitle>
        <Navigation />
      </HeaderContainer>
    );
  }
}

Header.propTypes = propTypes;

export default Header;
