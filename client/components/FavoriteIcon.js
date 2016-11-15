import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
import _ from 'lodash';

import globals from '../utils/globals.js';
import withAuth from '../utils/withAuth.js';
import AuthService from '../utils/AuthService.js';

const propTypes = {
  addToast: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  auth: PropTypes.instanceOf(AuthService),
};

// Replace this with your own style
const FavoriteIconContainer = styled.div`
  display: inline-block;
  margin: 5px;
`;

const Heart = styled.i`
  color: red;
`;

class FavoriteIcon extends Component {
  constructor(props) {
    super(props);
    // Bind class functions here: this.function = this.function.bind(this)
    this.state = { favorited: null };
    this.onFavorite = this.onFavorite.bind(this);
  }

  componentDidMount() {
    if (_.find(
        this.props.auth.getProfile().favorites,
        f => f === this.props.code
      )) {
      this.setState({ favorited: true });
    } else {
      this.setState({ favorited: false });
    }
  }

  async onFavorite() {
    const profile = this.props.auth.getProfile();
    const { favorites } = profile;
    if (!this.state.favorited) {
      this.setState({ favorited: true });
      const moreFavorites = [...favorites, this.props.code];
      this.props.auth.setProfile(
        { ...profile, favorites: moreFavorites }
      );

      const res = await fetch(`${globals.API_ADDRESS}/user`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.props.auth.getToken(),
        },
        body: JSON.stringify({
          favorites: moreFavorites,
        }),
      });
      const data = await res.json();
      console.debug('FAVORITE response', data);
      if (data.success) {
        if (data.success) {
          this.props.addToast({
            message: `Lisäsit kurssin ${this.props.code} suosikkeihisi!`,
            level: 'success',
          });
        }
      }
    } else {
      this.setState({ favorited: false });
      const lessFavorites = _.without(favorites, this.props.code);
      this.props.auth.setProfile(
        { ...profile, favorites: lessFavorites }
      );
      const res = await fetch(`${globals.API_ADDRESS}/user`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.props.auth.getToken(),
        },
        body: JSON.stringify({
          favorites: lessFavorites,
        }),
      });
      const data = await res.json();
      console.debug('FAVORITE response', data);
      if (data.success) {
        this.props.addToast({
          message: `Poistit kurssin ${this.props.code} suosikeistasi`,
          level: 'info',
        });
      }
    }
  }

  render() {
    return (
      <FavoriteIconContainer>
        <a
          tabIndex='0'
          onClick={this.onFavorite}
        >
          <Heart
            className={
                        this.state.favorited
                      ? 'ion-ios-heart'
                      : 'ion-ios-heart-outline'
                      }
          />
        </a>
      </FavoriteIconContainer>
    );
  }
}

FavoriteIcon.propTypes = propTypes;

export default withAuth(FavoriteIcon);
