import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

import withToast from '../utils/withToast.js';
import Page from '../components/Page/Page.js';
import LoginComponent from '../components/Login/LoginComponent.js';

const propTypes = {
  url: PropTypes.object.isRequired,
  addToast: PropTypes.func.isRequired,
};
const Container = styled.div`
  background-image: url(/static/images/lib.jpg);
  background-size: cover;
  height: 80vh;
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

  render() {
    return (
      <Page noPadding>
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
