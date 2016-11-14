import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import Link from 'next/link';
// import ls from 'local-storage';
import styled from 'styled-components';

import Page from '../components/Page/Page.js';
import palette from '../utils/palette.js';
import globals from '../utils/globals.js';

const API_MIN_DELAY = 500; // milliseconds

const propTypes = {
  url: PropTypes.object.isRequired,
};

// Replace this with your own style
const SearchContainer = styled.div`
  display: block;
`;

const SearchInputContainer = styled.div`
  padding: 30px;
  background-color: ${palette.yellow};
`;

const FilterTitle = styled.h3`
  color: white;
  text-transform: uppercase;

`;

const Results = styled.div`
  padding: 30px;
`;

const SearchTitle = styled.h3`
  color: ${palette.headerGrey};
  margin-bottom: 30 px;
`;

const CourseList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Course = styled.li`
  margin-bottom: 20 px;
`;

const CourseLink = styled.span`
  font-size: 2 rem;
  color: ${palette.orange};
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

  async setOptions(keywords) {
    if (!keywords /* || keyword.length < 3 */) {
      this.setState({ options: [] });
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
        <Link href={`/course?code=${option.code}`}>
          <CourseLink>{option.code} - {option.name}</CourseLink>
        </Link>
        <div>opintopisteet {option.credits || 'n/a'}</div>
      </Course>
    );
  }

  render() {
    return (
      <Page noPadding>
        <SearchContainer>
          <SearchInputContainer>
            <input
              className='form-control'
              type='text'
              placeholder='Hae kurssin koodilla tai nimellä'
              value={this.state.keywords}
              onChange={this.handleChange}
            />
            <FilterTitle>Rajaa hakua</FilterTitle>
          </SearchInputContainer>
          <Results>
            <SearchTitle>
              HAKUTULOKSET ({this.state.options.length} kpl)
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

export default Search;
