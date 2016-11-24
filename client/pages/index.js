import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import Link from 'next/link';
import styled from 'styled-components';
import Rating from 'react-rating';
import InputRange from 'react-input-range';
import { Row, Col } from 'react-bootstrap';

import withToast from '../utils/withToast.js';
import Page from '../components/Page/Page.js';
import FavoriteIcon from '../components/FavoriteIcon.js';
import palette from '../utils/palette.js';
import globals from '../utils/globals.js';
import isLoggedIn from '../utils/isLoggedIn.js';

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
  font-weight: 500;
  font-family; 'Raleway'
`;

const FilterContainer = styled.div`
`;

const RowStyled = styled(Row)`

`;

const ColStyled = styled(Col)`
  padding-bottom: 2vh;
  font-size: 0.7em;
  text-transform: uppercase;
  font-weight: 600;
  color: ${palette.headerGrey};
`;

const StarRating = styled(Rating)`
  font-size: 1.2em;
  color: ${palette.headerGrey};
`;

const InputRangeStyled = styled(InputRange)`
  color: ${palette.headerGrey};
`;

const OptionText = styled.span`
  color: ${palette.titleGrey}
  font-size: 1em;
  font-family: Helvetica;
  padding: 7px;
`;

const DropdownBox = styled.div`
  flex: 1 1 auto;
  max-width: 10%;
`;

const TextField = styled.input`
  max-width: 30%;
  font-family: Helvetica;
  font-size: 1em;
  font-weight: 500;
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
      score: 0,
      workloadvalues: {
        min: 1,
        max: 4,
      },
      periodstart: '',
      periodend: '',
      credits: '',
      loggedIn: false,
    };
    this.setOptions = this.setOptions.bind(this);
    this.setOptionsThrottled = this.setOptionsThrottled.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }

  componentDidMount() {
    // Check if user is logged in
    this.setState({ loggedIn: isLoggedIn() });

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

  handleValuesChange(values) {
    this.setState({
      workloadvalues: values,
    });
  }

  handlePeriodStartChange(value) {
    this.setState({ periodstart: value });
  }

  handlePeriodEndChange(value) {
    this.setState({ periodend: value });
  }

  handleTextChange(field, event) {
    this.setState({ [field]: event.target.value });
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
                <ColStyled xs={6} sm={4} md={2}>Grade
                  <br />
                  <StarRating
                    empty='ion-ios-star-outline'
                    full='ion-ios-star'
                    initialRate={this.state.score}
                    onClick={rate => this.setState({ score: rate })}
                  />
                </ColStyled>

                <ColStyled xs={6} sm={4} md={2}>Workload
                  <br />
                  <InputRangeStyled
                    maxValue={5}
                    minValue={0}
                    step={1}
                    value={this.state.workloadvalues}
                    onChange={this.handleValuesChange.bind(this)}
                  />
                </ColStyled>

                <ColStyled xs={6} sm={4} md={2}>Period
                  <br />
                  <DropdownBox className='dropdown'>
                    <button
                      className='btn btn-xs btn-default dropdown-toggle'
                      type='button'
                      id='dropdownMenu'
                      data-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='true'
                    >
                      <OptionText>
                        {this.state.periodstart || 'course starts'}&nbsp;
                      </OptionText>
                      <span className='caret' />
                    </button>
                    <ul
                      className='dropdown-menu'
                      aria-labelledby='periodDropdown'
                    >
                      {
                        ['I', 'II', 'III', 'IV', 'V', 'summer'].map(
                        option =>
                          <li key={option}>
                            <a
                              tabIndex='0'
                              onClick={() =>
                                this.handlePeriodStartChange(option)
                              }
                            >
                              {option}
                            </a>
                          </li>
                        )
                      }
                    </ul>
                  </DropdownBox>
                  <DropdownBox className='dropdown'>
                    <button
                      className='btn btn-xs btn-default dropdown-toggle'
                      type='button'
                      id='dropdownMenu'
                      data-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='true'
                    >
                      <OptionText>
                        {this.state.periodend || 'course ends'}&nbsp;
                      </OptionText>
                      <span className='caret' />
                    </button>
                    <ul
                      className='dropdown-menu'
                      aria-labelledby='periodDropdown'
                    >
                      {
                        ['I', 'II', 'III', 'IV', 'V', 'summer'].map(
                        option =>
                          <li key={option}>
                            <a
                              tabIndex='0'
                              onClick={() =>
                                this.handlePeriodEndChange(option)
                              }
                            >
                              {option}
                            </a>
                          </li>
                        )
                      }
                    </ul>
                  </DropdownBox>
                </ColStyled>

                <ColStyled xs={6} sm={4} md={2}>Credits
                  <br />
                  <TextField
                    className='form-control'
                    id='startingYear'
                    type='number'
                    placeholder={this.state.credits ||
                      'credits'}
                    value={this.state.credits}
                    onChange={
                      this.handleTextChange.bind(this, 'startingYear')
                    }
                  />
                </ColStyled>

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
