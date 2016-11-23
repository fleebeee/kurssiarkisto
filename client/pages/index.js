import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import Link from 'next/link';
import ls from 'local-storage';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

import withToast from '../utils/withToast.js';
import Page from '../components/Page/Page.js';
import FavoriteIcon from '../components/FavoriteIcon.js';
import palette from '../utils/palette.js';
import globals from '../utils/globals.js';

const API_MIN_DELAY = 500; // milliseconds

const propTypes = {
  url: PropTypes.object.isRequired,
  addToast: PropTypes.func.isRequired,
};

// Replace this with your own style
const SearchContainer = styled.div`
  display: block;
`;

const SearchInputContainer = styled.div`
  padding: 30px;
  background-color: ${palette.yellow};
  color: ${palette.white};
  font-size: 1.5em;
  font-family: 'Raleway', Helvetica, sans serif;
`;

const SmallHeader = styled.h3`
  text-transform: uppercase;
  color: white;
  font-weight: 600;
  font-family; 'Raleway'
`;

const FilterContainer = styled.div`
`;

const RowStyled = styled(Row)`
`;

const ColStyled = styled(Col)`
  font-size: 0.7em;
  text-transform: uppercase;
  color: ${palette.headerGrey};
`;

const Results = styled.div`
  padding: 30px;
`;

const SearchTitle = styled.h3`
  color: ${palette.headerGrey};
  margin-bottom: 30px;
`;

const CourseList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Course = styled.li`
  display: flex;
  margin-bottom: 20px;
`;

const CourseLink = styled.span`
  font-size: 2rem;
  color: ${palette.orange};
`;

const FavoriteIconContainer = styled.div`
  display: inline-block;
  margin-left: 10px;
  min-width: 24px;
  padding-top: 2px;
`;

class Search extends Component {
  constructor(props) {
    super(props);
    // Bind class functions here: this.function = this.function.bind(this)
    this.state = {
      keywords: '',
      options: [],
    };
    this.setOptions = this.setOptions.bind(this);
    this.setOptionsThrottled = this.setOptionsThrottled.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }

  componentDidMount() {
    // Check if user is logged in
    this.setState({ loggedIn: _.has(JSON.parse(ls.get('profile')), 'id') });

    const query = this.props.url.query;
    if (_.has(query, 'toast')) {
      if (query.toast) {
        this.props.addToast({
          title: 'Adding course successful!',
          message: `You added course ${query.code || ''} - ${query.name || ''}`,
          level: 'success',
        });
      }
    }
  }

  async setOptions(keywords) {
    if (!keywords /* || keyword.length < 3 */) {
      this.setState({
        options: [],
        loggedIn: null,
      });
      return false;
    }

    // TODO Cache

    const res = await fetch(`${globals.API_ADDRESS}/search/${keywords}`);
    const data = await res.json();
    if (data.success) {
      this.setState({ options: data.courses });
      return true;
    }
    this.setState({ options: [] });
    return false;
  }

  setOptionsThrottled = _.throttle(this.setOptions, API_MIN_DELAY);

  handleChange(event) {
    const keywords = event.target.value;
    this.setState({ keywords });
    this.setOptionsThrottled(keywords);
  }

  renderOption(option) {
    return (
      <Course key={option.code}>
        <div>
          <Link href={`/course?code=${option.code}`}>
            <CourseLink>{option.code} - {option.name}</CourseLink>
          </Link>
          <div>opintopisteet {option.credits || 'n/a'}</div>
        </div>
        {this.state.loggedIn &&
        <FavoriteIconContainer>
          <FavoriteIcon
            code={option.code}
            addToast={this.props.addToast}
          />
        </FavoriteIconContainer>
        }
      </Course>
    );
  }

  render() {
    return (
      <Page noPadding>
        <SearchContainer>
          <SearchInputContainer>
            <p> Search courses! </p>
            <input
              className='form-control'
              type='text'
              placeholder='search with course name or code'
              value={this.state.keywords}
              onChange={this.handleChange}
            />
            <SmallHeader>Filter results</SmallHeader>
            <FilterContainer>
              <RowStyled>
                <ColStyled xs={6} sm={4} md={2}>Grade</ColStyled>
                <ColStyled xs={6} sm={4} md={2}>Workload</ColStyled>
                <ColStyled xs={6} sm={4} md={2}>Period</ColStyled>
                <ColStyled xs={6} sm={4} md={2}>Credits</ColStyled>
                <ColStyled xs={6} sm={4} md={2}>Presence</ColStyled>
                <ColStyled xs={6} sm={4} md={2}>Passing Mechanisms</ColStyled>
              </RowStyled>

            </FilterContainer>
          </SearchInputContainer>
          <Results>
            <SearchTitle>
              SEARCH RESULTS ({this.state.options.length})
            </SearchTitle>
            <CourseList>
              {this.state.options.map(this.renderOption)}
            </CourseList>
          </Results>
        </SearchContainer>
      </Page>
    );
  }
}

Search.propTypes = propTypes;

export default withToast(Search);
