import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import ls from 'local-storage';

import NotAuthorized from '../components/NotAuthorized/NotAuthorized.js';

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      isAuthorized: 'pending',
      data: {},
    };
  }

  async componentDidMount() {
    const jwt = ls.get('jwt');

    if (jwt) {
      const res = await fetch('http://localhost:3003/auth/memberinfo', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: jwt,
        },
      });

      const data = await res.json();

      if (data.success) {
        this.setState({ isAuthorized: 'yes', data });
      } else {
        this.setState({ isAuthorized: 'no' });
      }
    } else {
      this.setState({ isAuthorized: 'no' });
    }
  }

  render() {
    if (this.state.isAuthorized !== 'yes') {
      return (
        <NotAuthorized status={this.state.isAuthorized} />
      );
    }
    return (
      <div>
        Hello you are authorized {this.state.data.msg}
      </div>
    );
  }
}

export default Preferences;
