import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

import palette from '../../utils/palette.js';
import Navigation from './Navigation.js';

const propTypes = {
  children: PropTypes.node,
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${palette.headerGrey};
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
