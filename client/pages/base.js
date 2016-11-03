import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

const propTypes = {
  url: PropTypes.object.isRequired,
};

const BaseContainer = styled.div`
  color: palevioletred;
`;

class Base extends Component {
  constructor(props) {
    super(props);
    // Bind class functions here: this.function = this.function.bind(this)
    this.state = {};
  }

  render() {
    return (
      <BaseContainer>
        Base
      </BaseContainer>
    );
  }
}

Base.propTypes = propTypes;

export default Base;
