import React, { Component, PropTypes } from 'react';

import AuthService from '../utils/AuthService.js';
import withAuth from '../utils/withAuth.js';
import Page from '../components/Page/Page.js';
import Link from 'next/link';
import styled from 'styled-components';
import _ from 'lodash';

import globals from '../utils/globals.js';
import palette from '../utils/palette.js';

const propTypes = {
  auth: PropTypes.instanceOf(AuthService),
};

const Title = styled.h1`
  text-transform: uppercase;
  color: ${palette.titleGrey};
  font-weight: bold;
  font-family: 'Raleway', Helvetica, sans serif;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${palette.yellow};
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  color: ${palette.white};
`;


class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.auth.getProfile().favorites,
    };
  }

  render() {
    console.log(this.state);
    return (
      <Page>
        <Title>Suosikit</Title>
          <Content>
          <h3>Suosikkikurssisi</h3>
          <ul>
            {this.state.favorites &&
             this.state.favorites.map(favorite =>
               <Link href={'/course?code='+favorite}>
               <li key={favorite}>{favorite}</li>
               </Link>
             )}
          </ul>
          </Content>
      </Page>
    );
  }
}

Favorites.propTypes = propTypes;

export default withAuth(Favorites);
