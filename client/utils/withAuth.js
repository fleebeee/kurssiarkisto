// A HOC for protected pages
import React, { Component, PropTypes } from 'react';
import AuthService from './AuthService.js';
import LoadingIndicator from '../components/LoadingIndicator.js';

const propTypes = {
  url: PropTypes.object.isRequired,
};

export default (AuthComponent) => {
  const Auth = new AuthService('http://localhost:3003');

  class Authenticated extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
      };
    }

    componentDidMount() {
      if (!Auth.loggedIn()) {
        console.debug('You do not have sufficient permissions');
        this.props.url.pushTo('/');
      }
      this.setState({ isLoading: false });
    }

    render() {
      return (
        <div>
          {this.state.isLoading
          ?
            <LoadingIndicator />
          :
            <AuthComponent {...this.props} auth={Auth} />
          }
        </div>
      );
    }
  }

  Authenticated.propTypes = propTypes;
  return Authenticated;
};
