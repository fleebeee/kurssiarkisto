import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

// import ls from 'local-storage';
import styled from 'styled-components';

const API_MIN_DELAY = 500; // milliseconds

const propTypes = {
  url: PropTypes.object.isRequired,
};

// Replace this with your own style
const SearchContainer = styled.div`
  display: block;
`;

class Search extends Component {
  constructor(props) {
    super(props);
    // Bind class functions here: this.function = this.function.bind(this)
    this.state = {
      options: [],
      lastFetch: null,
    };
    this.getCourses = this.getCourses.bind(this);
    this.getCoursesThrottled = this.getCoursesThrottled.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    // This gets triggered when clicking on a search result
    this.props.url.pushTo(`/course?code=${value.code}`);
  }

  async getCourses(keyword) {
    if (!keyword /* || keyword.length < 3 */) {
      return Promise.resolve({ options: [] });
    }

    const res = await fetch(`http://localhost:3003/search/${keyword}`);
    const data = await res.json();
    if (data.success) {
      this.setState({ options: data.courses });
      return { options: data.courses };
    }
    return { options: this.state.options };
  }

  getCoursesThrottled = _.throttle(this.getCourses, API_MIN_DELAY);

  render() {
    const AsyncComponent = Select.Async;

    return (
      <SearchContainer>
        <AsyncComponent
          onChange={this.onChange}
          valueKey='searchName'
          labelKey='searchName'
          loadOptions={this.getCoursesThrottled}
          instanceId='DoWWWs' // NOTE required for isomorphism
          placeholder='Hae kursseja'
          noResultsText='Ei hakutuloksia'
          searchPromptText='Kirjoita osa kurssin koodista tai nimestä'
        />
      </SearchContainer>
    );
  }
}

Search.propTypes = propTypes;

export default Search;
