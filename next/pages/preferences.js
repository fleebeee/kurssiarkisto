import React from 'react'
import 'isomorphic-fetch'
import ls from 'local-storage';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      isAuthenticated: 'pending',
      data: {}
    };
  }

  async componentDidMount() {
    const jwt = ls.get('jwt');

    if (!!jwt) {
      const res = await fetch('http://localhost:3003/api/memberinfo', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': jwt
        },
      });

      const data = await res.json();

      if (!!data.success) {
        this.setState({ isAuthenticated: 'yes', data: data });
      }
      else {
        this.setState({ isAuthenticated: 'no' });
      }
    }
    else {
      this.setState({ isAuthenticated: 'no' });
    }
  }

  render () {
    if (this.state.isAuthenticated === 'pending') {
      return (
        <div>
          Loading indicator
        </div>
      );
    }
    else if (this.state.isAuthenticated === 'no') {
      return (
        <div>
          Unauthorized
        </div>
      );
    }
    else if (this.state.isAuthenticated == 'yes') {
      return (
        <div>
          Hello you are authenticated {this.state.data.msg}
        </div>
      );
    }
  }
}
