import React, { Component, PropTypes } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
// import _ from 'lodash';

import AuthService from '../utils/AuthService.js';
import withAuth from '../utils/withAuth.js';
import Page from '../components/Page/Page.js';
import withToast from '../utils/withToast.js';
import FavoriteIcon from '../components/FavoriteIcon.js';

// import globals from '../utils/globals.js';
import palette from '../utils/palette.js';

const propTypes = {
  auth: PropTypes.instanceOf(AuthService),
  // url: PropTypes.object,
  addToast: PropTypes.func.isRequired,
};

const Title = styled.h1`
  text-transform: uppercase;
  color: ${palette.titleGrey};
  font-weight: bold;
  font-family: 'Raleway', Helvetica, sans serif;
`;

const FavoriteIconContainer = styled.div`
  display: inline-block;
  margin-right: 10px;
  min-width: 13px;
  padding-top: 2px;
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

const LinkText = styled.span`
  color: ${palette.white};
  font-family: 'Raleway', Helvetica, sans serif;
  font-size: 1.3em;
`;

const LiStyled = styled.li`
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
              <LiStyled>
                <FavoriteIconContainer>
                  <FavoriteIcon
                    code={favorite}
                    addToast={this.props.addToast}
                  />
                </FavoriteIconContainer>
                <Link href={`/course?code=${favorite}`} key={favorite}>
                  <LinkText>{favorite}</LinkText>
                </Link> <br />
              </LiStyled>
            )}
          </ul>

        </Content>
      </Page>
    );
  }
}

Favorites.propTypes = propTypes;

export default withAuth(withToast(Favorites));
