// A HOC for protected pages
import React, { Component /* PropTypes */ } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import AuthService from './AuthService.js';
import LoadingIndicator from '../components/LoadingIndicator.js';

const propTypes = {
  // something: PropTypes.any,
};

const AuthContainer = styled.div`
  padding: 30px;
`;

export default (AuthComponent) => {
  const Auth = new AuthService('http://localhost:3003');

  class Authenticated extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        authorized: null,
      };
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

    render() {
      if (this.state.isLoading) {
        return <LoadingIndicator />;
      }

      if (this.state.authorized) {
        return <AuthComponent {...this.props} auth={Auth} />;
      }

      return (
        <AuthContainer>
          Please <Link href='/login'>log in.</Link>
        </AuthContainer>
      );
    }
  }

  Authenticated.propTypes = propTypes;
  return Authenticated;
};
