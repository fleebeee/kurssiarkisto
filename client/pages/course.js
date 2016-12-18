import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button, Modal, Table, // Panel,
/* Grid,  Row, Col, Clearfix */ } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import Link from 'next/link';
import styled from 'styled-components';
import _ from 'lodash';
import ls from 'local-storage';

import globals from '../utils/globals.js';
import palette from '../utils/palette.js';
import withToast from '../utils/withToast.js';
import isLoggedIn from '../utils/isLoggedIn.js';

import Page from '../components/Page/Page.js';
import ReviewModal from '../components/Course/ReviewModal.js';
import FavoriteIcon from '../components/FavoriteIcon.js';
import Comments from '../components/Course/Comments.js';

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

const ReviewDisplay = styled.p`
  text-transform: uppercase;
  color: ${palette.titleGrey};
  font-weight: semi-bold;
  font-family: 'Raleway', Helvetica, sans serif;
  padding-left: 10px;
  padding-top: 7px;
`;

const FavoriteIconContainer = styled.div`
  display: inline-block;
  margin-left: 10px;
  width: 33px;
  padding-top: 2px;
`;

const NameContainer = styled.div`
  display: flex;
`;

const ulStyled = styled.ul`
  margin: 0;
  padding: 0;
`;

const liStyled = styled.li`
  list-item-style: none;
`;

const Arrow = styled.h1`
  color: ${palette.orange};
  height: 100%;
  width: 100%;
  padding-right: 10px;
`;

const CourseContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 15px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0;
  font-family: 'Raleway', Helvetica, sans serif;
  font-weight: bold;
  font-size: 1.3em;
  color: ${palette.headerGrey};
  padding-right: 5%;
  line-height: 155%;
  min-width: 300px;
`;

const MSGContainer = styled.div`
  background-color: #eea236;
  border-radius: 10px;
  padding: 15px;
  flex: 1 1 0;
  min-width: 300px;
`;

const ModalStyled = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10% 10% 10% 10%;
`;

/* const tr1 = styled.tr`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const tr2 = styled.tr`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`; */


class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {},
      showModal: false,
      reviews: [],
      score: null,
      workload: null,
      loggedIn: null,
      ownReview: null,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.calcAverage = this.calcAverage.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }

  async componentDidMount() {
    // Check if user is logged in
    const loggedIn = isLoggedIn();
    this.setState({ loggedIn });

    // Fetch course data from server
    const query = this.props.url.query;
    if (_.has(query, 'code')) {
      // TODO Probably move API calls elsewhere to reduce clutter
      const res = await fetch(
        `${globals.API_ADDRESS}/course/${query.code}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

      const data = await res.json();
      if (data.success) {
        this.setState({ course: data.course });

        this.getReviews();
      }
    }
  }

  async getReviews() {
    const loggedIn = isLoggedIn();
    const query = this.props.url.query;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (loggedIn) {
      headers.Authorization = ls.get('jwt');
    }

    // Fetch review data
    const res = await fetch(
      `${globals.API_ADDRESS}/review/${query.code}`,
      {
        method: 'GET',
        headers,
      });
    const data = await res.json();
    if (data.success) {
      this.setState({
        reviews: data.reviews,
        ownReview: data.ownReview,
        score: this.calcAverage(data.reviews, 'score'),
        workload: this.calcAverage(data.reviews, 'workload'),
      });
    }
  }

  calcAverage(array, field) {
    if (!array.length) {
      return null;
    }
    let sum = 0;
    for (const object of array) {
      sum += parseInt(object[field], 10);
    }
    return (sum / array.length).toFixed(2);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  async submitReview(options) {
    const { score, workload, userToken } = options;

    if (!userToken) {
      this.props.addToast({
        title: 'Adding review failed',
        message: 'You are not logged in',
        level: 'warning',
      });
      return;
    }

    if (!this.state.course.code) {
      this.props.addToast({
        title: 'Adding review failed',
        message: 'Course not chosen',
        level: 'warning',
      });
      return;
    }

    if (!score || score < 1 || score > 5) {
      this.props.addToast({
        title: 'Adding review failed',
        message: 'Score not set',
        level: 'warning',
      });
      return;
    }

    if (!workload || workload < 1 || workload > 5) {
      this.props.addToast({
        title: 'Adding review failed',
        message: 'Workload not set',
        level: 'warning',
      });
      return;
    }

    const method = this.state.ownReview ? 'PUT' : 'POST';

    const res = await fetch(`${globals.API_ADDRESS}/review`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
      body: JSON.stringify({
        score,
        workload,
        courseCode: this.state.course.code,
      }),
    });
    const data = await res.json();

    // If successful, close modal and show toast
    if (data.success) {
      this.props.addToast({
        /* eslint-disable max-len */
        message: `Review ${this.state.ownReview ? 'updated' : 'added'} successfully!`,
        /* eslint-enable max-len */
        level: 'success',
      });

      this.getReviews();
      this.close();
    } else {
      this.props.addToast({
        title: 'Adding/updating review failed',
        message: 'Something went wrong',
        level: 'warning',
      });
    }
  }

  render() {
    return (
      <Page>
        <NameContainer>
          <Link href='/'>
            <Arrow>
              <i className='ion-android-arrow-back' />
            </Arrow>
          </Link>
          <Title>
            {this.state.course.code} {this.state.course.name}
            {(this.state.course.code && this.state.loggedIn) &&
              <FavoriteIconContainer>
                <FavoriteIcon
                  code={this.state.course.code}
                  addToast={this.props.addToast}
                />
              </FavoriteIconContainer>}


          </Title>
        </NameContainer>
        <CourseContainer>

          <ButtonGroup>
            <Button bsStyle='warning' onClick={this.open}>Review</Button>

            <ModalStyled show={this.state.showModal} onHide={this.close}>
              <ReviewModal
                isNotPage
                ownReview={this.state.ownReview}
                close={this.close}
                submit={this.submitReview}
              />
            </ModalStyled>

            <Button bsStyle='warning'>Edit</Button>
          </ButtonGroup>
          <ReviewDisplay> {this.state.reviews.length} reviews </ReviewDisplay>


        </CourseContainer>
        <CourseContainer>
          <InfoContainer>
            <Table striped bordered >
              <tbody>
                <tr>
                  <td>Score</td>
                  <td>{this.state.score || 'N/A'}</td>
                </tr>
                <tr>
                  <td>Workload</td>
                  <td>{this.state.workload || 'N/A'}</td>
                </tr>
                <tr>
                  <td>Periods</td>
                  <td>
                    {_.has(this.state, 'course.instances') &&
                    this.state.course.instances.map((instance, key) =>
                      <div key={key}>
                        {instance.startPeriod} - {instance.endPeriod}
                      </div>,
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Credits</td>
                  <td>{this.state.course.credits}</td>
                </tr>
                <tr>
                  <td>Content</td>
                  <td><ulStyled>
                    {this.state.course.passingMechanisms ?
                      this.state.course.passingMechanisms.map(
                      passingMechanism =>
                        <liStyled key={passingMechanism}>
                          {passingMechanism}
                          <br />
                        </liStyled>,
                    ) : 'N/A'}
                  </ulStyled></td>
                </tr>
                <tr>
                  <td> Mandatory <br />attendance?</td>
                  <td>
                    {this.state.course.mandatoryAttendance ? 'Yes' : 'No'}
                  </td>
                </tr>
                <tr>
                  <td>Links</td>
                  <td>
                    {this.state.course.myCoursesLink ?
                      <a
                        href={this.state.course.myCoursesLink}
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        MyCourses <br />
                      </a> : ''
                      }
                    {this.state.course.tenttiArkistoLink ?
                      <a
                        href={this.state.course.tenttiArkistoLink}
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                         Tenttiarkisto
                      </a> : ''
                    }


                  </td>
                </tr>
              </tbody>
            </Table>
          </InfoContainer>
          <MSGContainer>
            {this.state.course.code &&
            <Comments courseCode={this.state.course.code} />}
          </MSGContainer>
        </CourseContainer>
      </Page>
    );
  }
}

Course.propTypes = propTypes;

export default withToast(Course);
