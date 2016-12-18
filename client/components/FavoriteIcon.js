import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled, { keyframes } from 'styled-components';
import _ from 'lodash';

import globals from '../utils/globals.js';
import withAuth from '../utils/withAuth.js';
import AuthService from '../utils/AuthService.js';
import palette from '../utils/palette.js';

const propTypes = {
  addToast: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  auth: PropTypes.instanceOf(AuthService),
};

// Replace this with your own style
const FavoriteIconContainer = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
`;

const Button = styled.div`
  outline: 0;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

const HeartEmpty = styled.svg`
  stroke: ${palette.headerGrey};
  fill: white;
  position: relative;
  top: 2px;
  height: 100%;
  min-height: 16px;
  transition: fill 0.5s;

  &:hover {
    fill: ${palette.headerGrey};
    animation: ${pulse} 1s ease infinite;
  }
`;

const HeartEmptyLinger = styled(HeartEmpty)`
  transition: none;

  &:hover {
    fill: white;
    animation: none;
  }
`;

const HeartFull = styled(HeartEmpty)`
  fill: ${palette.headerGrey};

  &:hover {
    fill: white;
    animation: none;
  }
`;

const HeartFullLinger = styled(HeartFull)`
  transition: none;

  &:hover {
    fill: ${palette.headerGrey};
    animation: none;
  }
`;

class FavoriteIcon extends Component {
  constructor(props) {
    super(props);
    // Bind class functions here: this.function = this.function.bind(this)
    this.state = {
      favorited: null,
      hover: false,
    };
    this.onFavorite = this.onFavorite.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    if (_.find(
        this.props.auth.getProfile().favorites,
        f => f === this.props.code,
      )) {
      this.setState({ favorited: true });
    } else {
      this.setState({ favorited: false });
    }
  }

  onMouseEnter() {
    this.setState({
      hover: true,
      stillHovering: false, // just in case
    });
  }

  onMouseLeave() {
    this.setState({
      hover: false,
      stillHovering: false,
    });
  }

  async onFavorite() {
    const profile = this.props.auth.getProfile();
    const { favorites } = profile;
    if (!this.state.favorited) {
      this.setState({
        favorited: true,
        stillHovering: true,
      });
      const moreFavorites = [...favorites, this.props.code];
      this.props.auth.setProfile(
        { ...profile, favorites: moreFavorites },
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

      if (data.success) {
        if (data.success) {
          this.props.addToast({
            /* eslint-disable max-len */
            message: `You added the course ${this.props.code} to your favorites!`,
            /* eslint-enable max-len */
            level: 'success',
          });
        }
      }
    } else {
      this.setState({
        favorited: false,
        stillHovering: true,
      });
      const lessFavorites = _.without(favorites, this.props.code);
      this.props.auth.setProfile(
        { ...profile, favorites: lessFavorites },
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

      if (data.success) {
        this.props.addToast({
          /* eslint-disable max-len */
          message: `You removed the course ${this.props.code} from your favorites`,
          /* eslint-enable max-len */
          level: 'info',
        });
      }
    }
  }

  render() {
    let Heart = HeartEmpty;

    if (this.state.stillHovering) {
      if (this.state.favorited) {
        Heart = HeartFullLinger;
      } else {
        Heart = HeartEmptyLinger;
      }
    } else if (this.state.favorited) {
      Heart = HeartFull;
    }

    return (
      <FavoriteIconContainer>
        <Button
          tabIndex='0'
          onClick={this.onFavorite}
        >
          {/* eslint-disable max-len */}
          <Heart
            viewBox='-2 -2 36 33.6'
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <path d='M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z' />
          </Heart>
          {/* eslint-enable max-len */}
        </Button>
      </FavoriteIconContainer>
    );
  }
}

FavoriteIcon.propTypes = propTypes;

export default withAuth(FavoriteIcon);
