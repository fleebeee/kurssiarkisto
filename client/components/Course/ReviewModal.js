import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button, Modal } from 'react-bootstrap';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
import Rating from 'react-rating';
import palette from '../../utils/palette.js';

import AuthService from '../../utils/AuthService.js';
import withAuth from '../../utils/withAuth.js';

const propTypes = {
  // url: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(AuthService),
  close: PropTypes.func.isRequired,
};

const ReviewModalContainer = styled.div`
  display: inline;
`;

const StarRating = styled(Rating)`
  font-size: 35px;
  color: ${palette.yellow};
`;

class ReviewModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: this.props.auth.getProfile().id,
      score: null,
      workload: null,
    };
  }

  render() {
    return (
      <ReviewModalContainer>
        <Modal.Header closeButton>
          <Modal.Title>Review course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* eslint-disable max-len */}
          <h4>Score</h4>
          <p>Give the course an overall score on a scale from 1 to 5 (1 = bad, 5 = excellent). You can take into account things such as how fun, interesting or beneficial the course was.</p>
          <StarRating
            empty='ion-ios-star-outline'
            full='ion-ios-star'
            initialRate={this.state.score}
            onClick={rate => this.setState({ score: rate })}
          />
          <h4>Workload</h4>
          <p>Rate the course workload on a scale from 1 to 5 (1 = very light, 5 = very heavy).</p>
          <StarRating
            empty='ion-ios-star-outline'
            full='ion-ios-star'
            initialRate={this.state.workload}
            onClick={rate => this.setState({ workload: rate })}
          />
          {/* eslint-enable max-len */}
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button
              bsStyle='warning'
              onClick={() => this.props.submit(this.state)}
            >
              Save
            </Button>
            <Button
              bsStyle='warning'
              onClick={this.props.close}
            >
              Close
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </ReviewModalContainer>
    );
  }
}

ReviewModal.propTypes = propTypes;

export default withAuth(ReviewModal);
