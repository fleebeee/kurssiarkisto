import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

import palette from '../../utils/palette.js';

const propTypes = {
  children: PropTypes.node,
};

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${palette.headerGrey};
  min-height: 8vh;
  font-family: 'Helvetica Neue', Helvetica, sans serif;
  font-size: 0.9em;
  color: ${palette.white};
  padding-left: 10px;
`;

const Content = styled.div`
  display: block;
`;

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <FooterContainer>
        <Content>CSE-E4400 Design of WWW Services</Content>
      </FooterContainer>
    );
  }
}

Footer.propTypes = propTypes;

export default Footer;
