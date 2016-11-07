import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

import Page from '../components/Page/Page.js';

const propTypes = {
  url: PropTypes.object,
};

const aa = styled.div`
  flex: 1 0 auto;
  padding: 5%;
  background-image: url(/static/images/lib.jpg);
  background-size: cover;
`;

// Replace this with your own style
const IndexContainer = styled.div`
  display: block;
`;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (

      <Page>
        <IndexContainer>
          <h1>Kurssiarkisto</h1>
          <p>Tervetuloa!</p>
        </IndexContainer>
      </Page>

    );
  }
}

Index.propTypes = propTypes;

export default Index;
