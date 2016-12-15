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
  noPadding: PropTypes.bool,
  withBackground: PropTypes.bool,
  children: PropTypes.node,
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

let Content = null;

const ContentWithoutBg = styled.div`
  flex: 1 0 auto;
  background-color: white;
`;

const ContentWithBg = styled(ContentWithoutBg)`
  background-image: linear-gradient(
    to bottom,
    rgba(255,255,255,0.2) 0%,
    rgba(255,255,255,0.2) 100%
  ), url(/static/images/lib.jpg);
  background-size: cover;
`;

const HeaderContainer = styled.div`
  flex: none;
`;

const Padding = styled.div`
  padding: 5%;
`;

const FooterContainer = styled(HeaderContainer)`
`;

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.withBackground) {
      Content = ContentWithBg;
    } else {
      Content = ContentWithoutBg;
    }

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
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Raleway:300,300i,400,500,600,700,800' />
          <script src='/static/js/jquery-3.1.1.min.js' />
          <script src='/static/js/bootstrap.min.js' />
          {/* react-select dependencies */}
          <script src='/static/js/react-select/react.min.js' />
          <script src='/static/js/react-select/react-dom.min.js' />
          <script src='/static/js/react-select/classnames.js' />
          <script src='/static/js/react-select/react-input-autosize.js' />
          <script src='/static/js/react-select/react-select.js' />
          <link rel='stylesheet' href='/static/css/react-select.css' />
          {/* eslint-enable max-len */}
        </Head>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <Content>
          {
            this.props.noPadding
          ? this.props.children
          : <Padding>{this.props.children}</Padding>
          }
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
