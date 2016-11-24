import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import Link from 'next/link';
import ls from 'local-storage';
import styled from 'styled-components';
// import Rating from 'react-rating';
// import InputRange from 'react-input-range';
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
  font-weight: 500;
  font-family; 'Raleway'
`;

const FilterContainer = styled.div`
`;

const RowStyled = styled(Row)`
  align-items: left;
`;

const ColStyled = styled(Col)`
  padding-bottom: 2vh;
  font-size: 0.7em;
  text-transform: uppercase;
  font-weight: 600;
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

const CheckboxText = styled.span`
  color: white;
  font-weight: 500;
  text-transform: lowercase;
  font-family: Helvetica;
  font-size: 0.9em;
  margin-left: 5px;
  line-height: 1;
`;

const YesnoText = styled.span`
  color: ${palette.orange};
  text-transform: lowercase;
  font-size: 0.8em;
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
      loggedIn: false,
      options: [],
      score: null,
      workloadvalues: {
        min: 1,
        max: 4,
      },
      periodstart: '',
      periodend: '',
      credits: null,
      attendance: '',
      examyes: false,
      examno: false,
      excerciseyes: false,
      excerciseno: false,
      groupyes: false,
      groupno: false,
      diaryyes: false,
      diaryno: false,
      assignmentyes: false,
      assignmentno: false,
      labyes: false,
      labno: false,
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

  handleCheckboxChange(field) {
    this.setState({ [field]: !this.state[field] });
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
            <input
              className='form-control'
              type='text'
              placeholder='Search with course name or code'
              value={this.state.keywords}
              onChange={this.handleChange}
            />
            <SmallHeader>Filter results</SmallHeader>
            <FilterContainer>
              <RowStyled>

                <ColStyled xs={6} sm={3} md={2}>Period
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

                <ColStyled xs={6} sm={3} md={2}>Credits
                  <br />
                  <TextField
                    className='form-control'
                    id='credits'
                    type='number'
                    placeholder={this.state.credits}
                    value={this.state.credits}
                    onChange={
                      this.handleTextChange.bind(this, 'credits')
                    }
                  />
                </ColStyled>
                <div className='clearfix visible-xs-block'></div>
                <ColStyled xs={6} sm={3} md={2}>Presence
                  <br />
                  <input
                    type='checkbox'
                    value={this.state.attendance}
                    onChange={
                      () => this.handleCheckboxChange('attendance')
                    }
                  />
                  <CheckboxText>not mandatory</CheckboxText>
                </ColStyled>

                <ColStyled xs={6} sm={3} md={2}>Passing Mechanisms
                  <br />
                  <YesnoText>yes/no</YesnoText>
                  <br />
                  <input
                    type='checkbox'
                    value={this.state.examyes}
                    onChange={
                      () => this.handleCheckboxChange('examyes')
                    }
                  />
                  <input
                    type='checkbox'
                    value={this.state.examno}
                    onChange={
                      () => this.handleCheckboxChange('examno')
                    }
                  />
                  <CheckboxText>exam</CheckboxText>
                  <br />
                  <input
                    type='checkbox'
                    value={this.state.excerciseyes}
                    onChange={
                      () => this.handleCheckboxChange('excerciseyes')
                    }
                  />
                  <input
                    type='checkbox'
                    value={this.state.excerciseno}
                    onChange={
                      () => this.handleCheckboxChange('excerciseno')
                    }
                  />
                  <CheckboxText>excercises</CheckboxText>

                  <br />
                  <input
                    type='checkbox'
                    value={this.state.groupyes}
                    onChange={
                      () => this.handleCheckboxChange('groupyes')
                    }
                  />
                  <input
                    type='checkbox'
                    value={this.state.groupno}
                    onChange={
                      () => this.handleCheckboxChange('groupno')
                    }
                  />
                  <CheckboxText>groupwork</CheckboxText>

                  <br />
                  <input
                    type='checkbox'
                    value={this.state.diaryyes}
                    onChange={
                      () => this.handleCheckboxChange('diaryyes')
                    }
                  />
                  <input
                    type='checkbox'
                    value={this.state.diaryno}
                    onChange={
                      () => this.handleCheckboxChange('diaryno')
                    }
                  />
                  <CheckboxText>lecture diaries</CheckboxText>

                  <br />
                  <input
                    type='checkbox'
                    value={this.state.assignmentyes}
                    onChange={
                      () => this.handleCheckboxChange('assignmentyes')
                    }
                  />
                  <input
                    type='checkbox'
                    value={this.state.assignmentno}
                    onChange={
                      () => this.handleCheckboxChange('assignmentno')
                    }
                  />
                  <CheckboxText>assignment</CheckboxText>

                  <br />
                  <input
                    type='checkbox'
                    value={this.state.labyes}
                    onChange={
                      () => this.handleCheckboxChange('labyes')
                    }
                  />
                  <input
                    type='checkbox'
                    value={this.state.labno}
                    onChange={
                      () => this.handleCheckboxChange('labno')
                    }
                  />
                  <CheckboxText>lab assignments</CheckboxText>
                </ColStyled>

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
