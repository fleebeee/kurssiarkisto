import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
import Head from 'next/head';

import Header from './Header.js';
import Footer from './Footer.js';

// Global jQuery for Bootstrap
global.jQuery = global.$ = require('jquery');

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
  background-size: cover;
`;

const FooterContainer = styled(HeaderContainer)`
`;

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PageContainer>
        <Head>
          <title>Kurssiarkisto</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          {/* eslint-disable max-len */}
          <link rel='stylesheet' href='/static/css/bootstrap.min.css' />
          <link rel='stylesheet' href='/static/css/ionicons.min.css' />
          <link rel='stylesheet' href='/static/css/loadingindicator.css' />
          <script src='/static/js/jquery-3.1.1.min.js' />
          <script src='/static/js/bootstrap.min.js' />
          {/* eslint-enable max-len */}
        </Head>
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
