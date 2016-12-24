// A HOC for protected pages
import React, { Component, PropTypes } from 'react';
import Link from 'next/prefetch';
import styled from 'styled-components';

import AuthService from './AuthService.js';
import LoadingIndicator from '../components/LoadingIndicator.js';
import Page from '../components/Page/Page.js';

const propTypes = {
  isNotPage: PropTypes.bool,
};

const AuthContainer = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Split = styled.div`
  padding: 10px 0 10px 0;
`;

export default (AuthComponent) => {
  const Auth = new AuthService('http://localhost:3003');

  class Authenticated extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showLogin: false,
        isLoading: true,
        authorized: null,
      };

      this.logInComponent = this.logInComponent.bind(this);
    }

    componentDidMount() {
      if (!Auth.loggedIn()) {
        console.debug('You do not have sufficient permissions');
        this.setState({ authorized: false });
        this.setState({ isLoading: false });
        return;
      }
      this.setState({ authorized: true });
      this.setState({ isLoading: false });
    }

    logInComponent() {
      return (
        <AuthContainer>
          <p>You are not logged in.</p>
          <Link href='/login'>Log in</Link>
          <Split>or</Split>
          <Link href='/signup'>Register</Link>
        </AuthContainer>
      );
    }

    render() {
      if (this.state.isLoading) {
        return <LoadingIndicator />;
      }

      if (this.state.authorized) {
        return <AuthComponent {...this.props} auth={Auth} />;
      }

      if (this.props.isNotPage) {
        return this.logInComponent();
      }
      return (
        <Page>
          {this.logInComponent()}
        </Page>
      );
    }
  }

  Authenticated.propTypes = propTypes;
  return Authenticated;
};
