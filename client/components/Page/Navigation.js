import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

import Link from 'next/link';

const propTypes = {
  children: PropTypes.node,
};

const NavigationContainer = styled.div`
  display: block;
  height: 100%;
`;

const MenuList = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  height: 100%;
`;

const MenuItem = styled.li`
  padding: 5px;
`;

const LinkText = styled.span`
  color: white;

  &:hover {
    color: hotpink;
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
        <MenuList>
          <MenuItem>
            <Link href='/'>
              <LinkText>Etusivu</LinkText>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href='/login'>
              <LinkText>Kirjaudu sisään</LinkText>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href='/signup'>
              <LinkText>Rekisteröidy</LinkText>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href='/preferences'>
              <LinkText>Asetukset</LinkText>
            </Link>
          </MenuItem>
        </MenuList>
      </NavigationContainer>
    );
  }
}

Navigation.propTypes = propTypes;

export default Navigation;
