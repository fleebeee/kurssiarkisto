import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button, Modal } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
import _ from 'lodash';

import withToast from '../utils/withToast.js';
import Page from '../components/Page/Page.js';
import ReviewModal from '../components/Course/ReviewModal.js';

const propTypes = {
  url: PropTypes.object,
  addToast: PropTypes.func.isRequired,
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
  flex: 6;
  font-family: 'Raleway', Helvetica, sans serif;
  font-weight: bold;
  font-size: 1.5em;
  color: #6A7C90;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 7;
  padding-right: 10px;
`;

const MSGContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  background-color: #E0CAA5;
  border-radius: 10px;
  padding: 10px;
`;

const ModalStyled = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10% 10% 10% 10%;
`;


class Course extends Component {
  constructor(props) {
    super(props);
    this.state = { course: {}, showModal: false, reviews: [] };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  async componentDidMount() {
    // Fetch course data from server
    const query = this.props.url.query;
    if (_.has(query, 'code')) {
      // TODO Probably move API calls elsewhere to reduce clutter
      let res = await fetch(`http://localhost:3003/course/${query.code}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      let data = await res.json();
      if (data.success) {
        console.debug('Course data:', data.course);
        this.setState({ course: data.course });

        // Fetch review data
        res = await fetch(`http://localhost:3003/review/${query.code}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        data = await res.json();
        if (data.success) {
          console.debug(
            `Review data fetched, ${data.reviews.length} review(s)`
          );
          this.setState({ reviews: data.reviews });
        } else {
          console.debug('Review data couldn\'t be fetched:', data);
        }
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
    const { score, workload, userID } = options;

    if (!userID) {
      console.debug('You need to log in');
      this.props.addToast({
        title: 'Arvostelun lisääminen epäonnistui',
        message: 'Et ole kirjautunut sisään',
        level: 'warning',
      });
      return;
    }

    if (!this.state.course.code) {
      console.debug('No course chosen');
      this.props.addToast({
        title: 'Arvostelun lisääminen epäonnistui',
        message: 'Kurssia ei ole valittu',
        level: 'warning',
      });
      return;
    }

    if (!score || score < 1 || score > 5) {
      console.debug('Score not set');
      this.props.addToast({
        title: 'Arvostelun lisääminen epäonnistui',
        message: 'Yleisarvosana puuttuu',
        level: 'warning',
      });
      return;
    }

    if (!workload || workload < 1 || workload > 5) {
      console.debug('Workload not set');
      this.props.addToast({
        title: 'Arvostelun lisääminen epäonnistui',
        message: 'Kuormittavuus puuttuu',
        level: 'warning',
      });
      return;
    }

    console.debug('Submitting review',
      { ...options, courseCode: this.state.course.code });
    const res = await fetch('http://localhost:3003/review', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score,
        workload,
        userID,
        courseCode: this.state.course.code,
      }),
    });
    const data = await res.json();

    // If successful, close modal and show toast
    if (data.success) {
      console.debug('Review added successfully', data);
      this.props.addToast({
        message: 'Arvostelu lisätty!',
        level: 'success',
      });
      this.close();
    } else {
      console.debug('Failed to add review', data);
      this.props.addToast({
        title: 'Arvostelun lisääminen epäonnistui',
        message: 'Palvelimella meni jokin vikaan',
        level: 'error',
      });
    }
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

              <ModalStyled show={this.state.showModal} onHide={this.close}>
                <ReviewModal
                  isNotPage
                  close={this.close}
                  submit={this.submitReview}
                />
              </ModalStyled>

              <Button bsStyle='warning' href='/index.js'>Muokkaa</Button>
              <Button bsStyle='warning'>Lisää suosikkeihin</Button>
            </ButtonGroup>
          </CourseContainer>
          <CourseContainer>
            <InfoContainer>
              <br />
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
                Tähän tulee kommentti boksi. Ja alla näkyy kurssin nimi <br />
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

export default withToast(Course);
