import React, { Component, PropTypes } from 'react';
import { ButtonGroup, Button, Modal } from 'react-bootstrap';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

const propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

// Replace this with your own style
const ReviewModalContainer = styled.div`
  display: inline;
`;

class ReviewModal extends Component {
  constructor(props) {
    super(props);
    // Bind class functions here: this.function = this.function.bind(this)
    this.state = {};
  }

  render() {
    return (
      <ReviewModalContainer>
        <Modal show={this.props.show} onHide={this.props.close}>
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
              <Button bsStyle='warning' onClick={this.props.close}>
                Tallenna
              </Button>
              <Button bsStyle='warning' onClick={this.props.close}>
                Sulje
              </Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </ReviewModalContainer>
    );
  }
}

ReviewModal.propTypes = propTypes;

export default ReviewModal;
