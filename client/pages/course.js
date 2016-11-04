import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

import Page from '../components/Page/Page.js';

const propTypes = {
  url: PropTypes.object,
};

const NameContainer = styled.div`
  display: flex;
`;

const Arrow = styled.img`
  width: 55px;
  height: 55px;
  margin-right: 15px;
`;

const CourseContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  font-family: 'Helvetica Neue', Helvetica, sans serif;
  font-size: 1.5em;
`;

const MSGContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  background-color: grey;
`;


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Page>
        <NameContainer>
          <Arrow
          src='/static/images/back-arrow.png'
          alt='Takaisin hakuun'/>
          <h1>CSE-E4400 Design of WWW Services</h1>
        </NameContainer>
        <CourseContainer>
          <InfoContainer>
          <ButtonGroup>
            <Button bsStyle="warning" href="/login.js">Arvostele</Button>
            <Button bsStyle="warning">Muokkaa</Button>
            <Button bsStyle="warning">Lisää suosikkeihin</Button>
          </ButtonGroup>
          <p>Tähän sitten niitä kurssin ominaisuuksia ou jee!</p>
          </InfoContainer>
          <MSGContainer>
            <p> tämän pitäisi näkyä oikealla. Tähän alle tulee kommentti boksi </p>
          </MSGContainer>
        </CourseContainer>
      </Page>
    );
  }
}

Index.propTypes = propTypes;

export default Index;
