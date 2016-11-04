import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

import Page from '../components/Page/Page.js';

const propTypes = {
  url: PropTypes.object,
};

// Replace this with your own style
const CourseContainer = styled.div`
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
        <CourseContainer>
          <h1>DoWWWs on aika muikku kurssi</h1>
          <p>Tähän sitten niitä kurssin ominaisuuksia ou jee!</p>
          <button> Review course </button> <button> Edit course </button>
        </CourseContainer>
      </Page>
    );
  }
}

Index.propTypes = propTypes;

export default Index;
