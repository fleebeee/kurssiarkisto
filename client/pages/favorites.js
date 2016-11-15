import React, { Component, PropTypes } from 'react';

import AuthService from '../utils/AuthService.js';
import withAuth from '../utils/withAuth.js';
import Page from '../components/Page/Page.js';

const propTypes = {
  auth: PropTypes.instanceOf(AuthService),
};

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
        <div>
          <h1>Suosikit</h1>
          <h3>Suosikkikurssisi</h3>
          <ul>
            {this.state.favorites &&
             this.state.favorites.map(favorite =>
               <li key={favorite}>{favorite}</li>
             )}
          </ul>
        </div>
      </Page>
    );
  }
}

Favorites.propTypes = propTypes;

export default withAuth(Favorites);
