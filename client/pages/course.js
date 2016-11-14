import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button, Modal, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
import _ from 'lodash';

import globals from '../utils/globals.js';
import palette from '../utils/palette.js';
import Link from 'next/link';
import withToast from '../utils/withToast.js';
import Page from '../components/Page/Page.js';
import ReviewModal from '../components/Course/ReviewModal.js';

const propTypes = {
  url: PropTypes.object,
  addToast: PropTypes.func.isRequired,
};

const Title = styled.h1`
  text-transform: uppercase;
  color: ${palette.titleGrey};
  font-weight: bold;
  font-family: 'Raleway', Helvetica, sans serif;
`;

const NameContainer = styled.div`
  display: flex;
`;

const ulStyled = styled.ul`
  margin: 0;
  padding: 0;
`;

const Arrow = styled.img`
  width: 55px;
  height: 55px;
  margin-right: 15px;
`;

const CourseContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  font-family: 'Raleway', Helvetica, sans serif;
  font-weight: bold;
  font-size: 1.5em;
  color: ${palette.headerGrey};
  margin-bottom: 20px;
  line-height: 175%;
`;

const MSGContainer = styled.div`
  background-color: #E0CAA5;
  border-radius: 10px;
  padding: 15px;
  flex: 1 1 auto;
`;

const ModalStyled = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10% 10% 10% 10%;
`;

const ColStyled = styled(Col)`
  margin-right: 20px;
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
      let res = await fetch(
        `${globals.API_ADDRESS}/course/${query.code}`,
        {
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
        res = await fetch(
          `${globals.API_ADDRESS}/review/${query.code}`,
          {
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
    const res = await fetch(`${globals.API_ADDRESS}/review`, {
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
          <NameContainer>
            <Link href='/'>
            <Arrow
              src='/static/images/back-arrow.png'
              alt='Takaisin hakuun'
            />
            </Link>
            <Title>{this.state.course.code} {this.state.course.name}</Title>
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

              <Button bsStyle='warning'>Muokkaa</Button>
              <Button bsStyle='warning'>Lisää suosikkeihin</Button>
            </ButtonGroup>
          </CourseContainer>
          <CourseContainer>
            <InfoContainer>

              <Row className="show-grid">
                <ColStyled xs={6} sm={4} md={4}>Yleisarvosana</ColStyled>
                <ColStyled xs={4} sm={4} md={5}>4.5</ColStyled>
              </Row>
              <Row className="show-grid">
                <ColStyled xs={6} sm={4} md={4}>Kuormittavuus</ColStyled>
                <ColStyled xs={4} sm={4} md={5}>3</ColStyled>
              </Row>
              <Row className="show-grid">
                <ColStyled xs={6} sm={4} md={4}>Periodit </ColStyled>
                <ColStyled xs={4} sm={4} md={5}>{this.state.course.periods}</ColStyled>
              </Row>
              <Row className="show-grid">
                <ColStyled xs={6} sm={4} md={4}>Opintopisteet</ColStyled>
                <ColStyled xs={4} sm={4} md={5}>{this.state.course.credits}</ColStyled>
              </Row>
              <Row className="show-grid">
                <ColStyled xs={6} sm={4} md={4}>Suoritusmuodot</ColStyled>
                <ColStyled xs={4} sm={4} md={5}>
                  <ulStyled>
                    {this.state.course.passingMechanisms &&
                      this.state.course.passingMechanisms.map(
                      passingMechanism =>
                        <li>{passingMechanism}</li>
                    )}
                  </ulStyled>
                </ColStyled>
              </Row>
              <Row className="show-grid">
                <ColStyled xs={6} sm={4} md={4}>Läsnäolopakko</ColStyled>
                <ColStyled xs={4} sm={4} md={5}> {this.state.course.mandatoryAttendance ? 'Kyllä' : 'Ei'} </ColStyled>
              </Row>
              <Row className="show-grid">
                <ColStyled xs={6} sm={4} md={4}> MyCourses</ColStyled>
                <ColStyled xs={4} sm={4} md={5}><a href={this.state.course.myCoursesLink} target="_blank">Linkki </a></ColStyled>
              </Row>
            </InfoContainer>

            <MSGContainer>
              <p>
                tämän pitäisi näkyä oikealla.
                Tähän tulee kommentti boksi. Ja alla näkyy kurssin nimi <br />
                {this.state.course.name}
              </p>
            </MSGContainer>
          </CourseContainer>
      </Page>
    );
  }
}

Course.propTypes = propTypes;

export default withToast(Course);
