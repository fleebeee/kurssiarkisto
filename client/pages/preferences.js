import React, { Component, PropTypes } from 'react';

import AuthService from '../utils/AuthService.js';
import withAuth from '../utils/withAuth.js';
import Page from '../components/Page/Page.js';

const propTypes = {
  auth: PropTypes.instanceOf(AuthService),
};

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const user = this.props.auth.getProfile();

    return (
      <Page>
        <div>
          <h1> Suosikit </h1>
        Tälle sivulle tulee lista suosikeista. Current user: {user.data}</div>
      </Page>
    );
  }
}

Preferences.propTypes = propTypes;

export default withAuth(Preferences);
