import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
import _ from 'lodash';

import Page from '../components/Page/Page.js';
import ReviewModal from '../components/Course/ReviewModal.js';

const propTypes = {
  url: PropTypes.object,
};


const NameContainer = styled.div`
  display: flex;
  font-family: 'Raleway', Helvetica, sans serif;
  color: #6A7C90;
`;

const Box = styled.div`
  display: block;
  position: relative;
  width: 92%;
  margin-top: 30px;
  left: 4%;
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
  padding-right: 10px;
`;

const MSGContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  background-color: #E0CAA5;
  border-radius: 10px;
  padding: 10px;
`;


class Course extends Component {
  constructor(props) {
    super(props);
    this.state = { course: {}, showModal: false };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.submitReview = this.submitReview.bind(this);
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

  async submitReview(options) {
    const { score, workload } = options;

    if (!score || score < 1 || score > 5) {
      // TODO show modal
      console.debug('Score not set');
      return;
    }

    if (!workload || workload < 1 || workload > 5) {
      console.debug('Workload not set');
      return;
    }

    // TODO Submit review to server
    /* console.log(score, workload);
    const res = await fetch('http://localhost:3003/review', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score,
        workload,
        userID: profile._id,
        courseID: this.state.course._id,
      }),
    });
    const data = await res.json();
    console.log('Review response', data); */

    // If successful, close modal and show toast
    this.close();
  }

  render() {
    return (
      <Page>
      <Box>
        <NameContainer>
          <Arrow
            src='/static/images/back-arrow.png'
            alt='Takaisin hakuun'
          />
           <h1>{this.state.course.code} {this.state.course.name}</h1>
        </NameContainer>
        <CourseContainer>

            <ButtonGroup>
              <Button bsStyle='warning' onClick={this.open}>Arvostele</Button>

              <ReviewModal
                show={this.state.showModal}
                submit={this.submitReview}
                close={this.close}
              />

              <Button bsStyle='warning' href='/index.js'>Muokkaa</Button>
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
              <p>Opintopisteet</p>
              <p>Suoritusmuodot</p>
              <p>Läsnäolopakko</p>
              <p>Linkki MyCoursesiin</p>
            </TextContainer>
            <DataContainer>
              <p> 4.5</p>
              <p> 3.5</p>
              <p> {this.state.course.periods} </p>
              <p> {this.state.course.credits}</p>
              <p> {this.state.course.passingMechanisms}</p>
              <p> Ei</p>
              <p> {this.state.course.myCoursesLink}</p>
            </DataContainer>
          </InfoContainer>
          <MSGContainer>
            <p>
              tämän pitäisi näkyä oikealla.
              Tähän tulee kommentti boksi. Ja alla näkyy kurssin nimi <br/>
              {this.state.course.name}
            </p>
          </MSGContainer>
        </CourseContainer>
      </Box>
      </Page>
    );
  }
}

Course.propTypes = propTypes;

export default Course;
