import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button, Modal } from 'react-bootstrap';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

import Page from '../components/Page/Page.js';

const propTypes = {
  url: PropTypes.object,
};


const NameContainer = styled.div`
  display: flex;
  font-family: 'Raleway', Helvetica, sans serif;
  color: #6A7C90;
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
  margin-top: 15px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  font-family: 'Raleway', Helvetica, sans serif;
  font-weight: bold;
  font-size: 1.5em;
  color: #6A7C90;
`;

const MSGContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  background-color: #E0CAA5;
`;



class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getInitialState() {
    return { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
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
            <Button bsStyle="warning" onClick={this.open}>Arvostele</Button>

            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title>Arvostele</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4>Text in a modal</h4>
                  <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                  <h4>Overflowing text to show scroll behavior</h4>
                  <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                  <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                  <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.close}>Sulje</Button>
                </Modal.Footer>
            </Modal>

            <Button bsStyle="warning" href="/login.js">Muokkaa</Button>
            <Button bsStyle="warning">Lisää suosikkeihin</Button>
          </ButtonGroup>


          <br></br>
          <p>Yleisarvosana</p>
          <p>Kuormittavuus</p>
          <p>Periodit</p>
          <p>Tentti?</p>
          <p>Harjoitustyö?</p>
          <p>Läsnäolopakko?</p>
          <p>Opintopisteet</p>
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
