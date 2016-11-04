import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.node,
};

const FooterContainer = styled.div`
  background-color: #FF7E00;
  font-family: 'Helvetica Neue', Helvetica, sans serif;
  font-size: 0.9em;
  color: #FFFFFF;
`;

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <FooterContainer>
        CSE-E4400 Design of WWW Services
      </FooterContainer>
    );
  }
}

Footer.propTypes = propTypes;

export default Footer;
