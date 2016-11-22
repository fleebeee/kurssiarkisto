import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
import styled from 'styled-components';

import Page from '../components/Page/Page.js';
import globals from '../utils/globals.js';
import AuthService from '../utils/AuthService';

const auth = new AuthService(`${globals.API_ADDRESS}`);

const propTypes = {
  url: PropTypes.object.isRequired,
};

// Replace this with your own style
const LogOutContainer = styled.div`
  display: block;
`;

class LogOut extends Component {
  constructor(props) {
    super(props);
    // Bind class functions here: this.function = this.function.bind(this)
    this.state = {};
  }

  componentDidMount() {
    auth.logout();
    this.props.url.pushTo('/');
  }

  render() {
    return (
      <Page>
        <LogOutContainer>
          Logging out...
        </LogOutContainer>
      </Page>
    );
  }
}

LogOut.propTypes = propTypes;

export default LogOut;
