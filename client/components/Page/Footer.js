import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.node,
};

const FooterContainer = styled.div`
  background-color: tomato;
`;

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <FooterContainer>
        Footer stuff
      </FooterContainer>
    );
  }
}

Footer.propTypes = propTypes;

export default Footer;
