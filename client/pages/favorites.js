import React, { Component, PropTypes } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import fetch from 'isomorphic-fetch';
import ls from 'local-storage';
// import _ from 'lodash';

import AuthService from '../utils/AuthService.js';
import withAuth from '../utils/withAuth.js';
import Page from '../components/Page/Page.js';
import withToast from '../utils/withToast.js';

// import globals from '../utils/globals.js';
import palette from '../utils/palette.js';

const propTypes = {
  auth: PropTypes.instanceOf(AuthService),
  url: PropTypes.object,
  addToast: PropTypes.func.isRequired,
};

const Title = styled.h1`
  text-transform: uppercase;
  color: ${palette.titleGrey};
  font-weight: bold;
  font-family: 'Raleway', Helvetica, sans serif;
`;

const IconContainer = styled.div`
  display: inline-block;
  margin-right: 10px;
  color: ${palette.white};
  transform: scale(1.35);
  padding-bottom: 3px;
`;


const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${palette.yellow};
  border-radius: 10px;
  padding: 25px;
  padding-top: 5px;
  width: 100%;
  color: ${palette.white};
`;

const LinkStyled = styled.a`
  color: ${palette.white};
  font-family: 'Raleway', Helvetica, sans serif;
  font-size: 1.3em;
`;

const liStyled = styled.li`
  list-style-type: none;
`;


class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.auth.getProfile().favorites,
    };
  }

  render() {
    return (
      <Page>
        <Title>Favorites</Title>
        <Content>
          <h3>Manage your favorite courses</h3>

          <ul>
            {this.state.favorites &&
            this.state.favorites.map(favorite =>
                <liStyled>
                  <IconContainer>
                    <i className='ion-trash-b'/>
                  </IconContainer>
                <LinkStyled href={`/course?code=${favorite}`} key={favorite}>
                  {favorite} <br/>
                </LinkStyled>
              </liStyled>
            )}
          </ul>

        </Content>
      </Page>
    );
  }
}

Favorites.propTypes = propTypes;

export default withAuth(Favorites);
