import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import withToast from '../utils/withToast.js';
import Page from '../components/Page/Page.js';
import LoginComponent from '../components/Login/LoginComponent.js';

const propTypes = {
  url: PropTypes.object.isRequired,
  addToast: PropTypes.func.isRequired,
};
const Container = styled.div`
  display: block;
`;

const Aligner = styled.div`
  padding-top: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const query = this.props.url.query;
    if (_.has(query, 'toast')) {
      if (query.toast === 'signup') {
        this.props.addToast({
          title: 'Sign up successful!',
          message: `Signed up successfully as ${query.name}!`,
          level: 'success',
        });
      }
    }
  }

  render() {
    return (
      <Page noPadding withBackground>
        <Container>
          <Aligner>
            <LoginComponent
              addToast={this.props.addToast}
              url={this.props.url}
            />
          </Aligner>
        </Container>
      </Page>
    );
  }
}

Login.propTypes = propTypes;

export default withToast(Login);
