import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

import Header from './Header.js';
import Footer from './Footer.js';

const propTypes = {
  children: PropTypes.node,
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const HeaderContainer = styled.div`
  flex: none;
`;

const Content = styled.div`
  flex: 1 0 auto;
  padding: 5%;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const FooterContainer = HeaderContainer;

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PageContainer>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <Content>
          {this.props.children}
        </Content>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </PageContainer>
    );
  }
}

Page.propTypes = propTypes;

export default Page;
