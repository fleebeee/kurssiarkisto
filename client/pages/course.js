import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button, Modal } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
import _ from 'lodash';

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
  flex-direction: row;
  width: 60%;
  font-family: 'Raleway', Helvetica, sans serif;
  font-weight: bold;
  font-size: 1.5em;
  color: #6A7C90;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 30%;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const MSGContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  background-color: #E0CAA5;
  border-radius: 10px;
  padding: 10px;
`;


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { course: {}, showModal: false };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  async componentDidMount() {
    // Fetch course data from server
    const query = this.props.url.query;
    if (_.has(query, 'code')) {
      // TODO Probably move API calls elsewhere to reduce clutter
      const res = await fetch(`http://localhost:3003/course/${query.code}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (data.success) {
        console.debug('Course data:', data.course);
        this.setState({ course: data.course });
      } else {
        console.debug('Course data couldn\'t be fetched:', data);
      }
    }
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
            alt='Takaisin hakuun'
          />
          <h1>CSE-E4400 Design of WWW Services</h1>  <h1>{this.state.course.name}</h1>
        </NameContainer>
        <CourseContainer>

            <ButtonGroup>
              <Button bsStyle='warning' onClick={this.open}>Arvostele</Button>

              <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title>Arvostele kurssi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* eslint-disable max-len */}
                  <h4>Yleisarvosana</h4>
                  <p>Anna kurssille yleisarvosana asteikolla 1-5 (1=huono, 5= erinomainen).</p>
                  <h4>Kuormittavuus</h4>
                  <p>Arvioi kurssin kuormittavuus asteikolla 1-5 (1=kevyt, 5= todella raskas).</p>
                  {/* eslint-enable max-len */}
                </Modal.Body>
                <Modal.Footer>
                  <ButtonGroup>
                    <Button bsStyle='warning' onClick={this.close}>Tallenna</Button>
                    <Button bsStyle='warning' onClick={this.close}>Sulje</Button>
                  </ButtonGroup>
                </Modal.Footer>
              </Modal>

              <Button bsStyle='warning' href='/login.js'>Muokkaa</Button>
              <Button bsStyle='warning'>Lisää suosikkeihin</Button>
            </ButtonGroup>
            </CourseContainer>
            <CourseContainer>
            <InfoContainer>
            <br/>
            <TextContainer>
              <p>Yleisarvosana</p>
              <p>Kuormittavuus</p>
              <p>Periodit</p>
              <p>Tentti</p>
              <p>Harjoitustyö</p>
              <p>Läsnäolopakko</p>
              <p>Opintopisteet</p>
            </TextContainer>
            <DataContainer>
              <p> 4.5</p>
              <p> 3.5</p>
              <p> I, II</p>
              <p> Kyllä</p>
              <p> Ei</p>
              <p> Ei</p>
              <p> 5</p>
            </DataContainer>
          </InfoContainer>
          <MSGContainer>
            <p>
              tämän pitäisi näkyä oikealla.
              Tähän alle tulee kommentti boksi. Ja alla näkyy kurssin nimi
              {this.state.course.name}
            </p>
          </MSGContainer>
        </CourseContainer>
      </Page>
    );
  }
}

Index.propTypes = propTypes;

export default Index;
