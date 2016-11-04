import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

import Page from '../components/Page/Page.js';

const propTypes = {
  url: PropTypes.object,
};

const Image = styled.img`
  width: 60px;
  height: 60px;
`;

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
        <Image
        src='/static/images/back-arrow.png'
        alt='Takaisin hakuun'/>
          <h1>CSE-E4400 Design of WWW Services</h1>
          <p>Tähän sitten niitä kurssin ominaisuuksia ou jee!</p>
          <ButtonGroup>
            <Button bsStyle="warning">Review</Button>
            <Button bsStyle="warning">Edit</Button>
          </ButtonGroup>
        </CourseContainer>
      </Page>
    );
  }
}

Index.propTypes = propTypes;

export default Index;
