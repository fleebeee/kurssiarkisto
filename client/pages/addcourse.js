import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import _ from 'lodash';
import styled from 'styled-components';
import palette from '../utils/palette.js';
import globals from '../utils/globals.js';

import withToast from '../utils/withToast.js';
import Page from '../components/Page/Page.js';

const propTypes = {
  url: PropTypes.object.isRequired,
  addToast: PropTypes.func.isRequired,
};

const AddCourseContainer = styled.div`
  display: block;
`;

const Title = styled.h1`
  text-transform: uppercase;
  color: ${palette.titleGrey};
`;

const Label = styled.label`
  display: block;
  margin-top: 8px;
  margin-bottom: 4px;
  color: ${palette.headerGrey};
  text-transform: uppercase;
  font-size: 0.9em;
  font-weight: 500;
`;

const AttendanceLabel = styled(Label)`
  margin-top: 16px;
`;

const TextField = styled.input`
  max-width: 80%;
`;

const SmallHeader = styled.h4`
  text-transform: uppercase;
  color: ${palette.white};
  margin-top: 3px;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${palette.yellow};
  border-radius: 10px;
  padding: 20px;
  width: 100%;
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const BasicInformation = styled.div`
  flex: 1 1 auto;
`;

const Details = styled.div`
  flex: 1 1 auto;
`;

const PassingMechanisms = styled.div`
  flex: 1 1 auto;
`;


const CheckboxField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ExerciseText = styled.span`
  font-size: 0.8em;
`;

const CheckboxText = styled.span`
  color: ${palette.white};
  font-size: 0.9em;
  font-weight: 500;
  margin-left: 5px;
  line-height: 1;
  margin-top: 4px;
`;

const Periods = styled.div`
  flex: 1 0 auto;
`;

const Misc = styled.div`
  flex: 1 0 auto;
`;

const AddCourseButton = styled.button`
  background-color: ${palette.headerGrey};
  color: ${palette.white};
  margin-top: 10px;
  align-self: flex-end;

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  overflow: hidden;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: color, background-color;
  transition-property: color, background-color;

  &:hover {
    background-color: ${palette.orange};
    color: ${palette.white};
  }
`;

class addCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      courseCode: '',

      hasExam: false,
      hasExercises: false,
      hasGroupwork: false,
      hasDiary: false,
      hasAssignment: false,
      hasLabAssignment: false,

      periods: {
        i: false,
        ii: false,
        iii: false,
        iv: false,
        v: false,
      },

      credits: '',
      hasMandatoryAttendance: false,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleHasExercisesChange = this.handleHasExercisesChange.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleCreditsChange = this.handleCreditsChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    console.log('Submitting', this.state);

    if (!this.state.courseName) {
      console.debug('Course name is required!');
      this.props.addToast({
        title: 'Adding course failed',
        message: 'Course name missing',
        level: 'warning',
      });
      return;
    }

    if (!this.state.courseCode) {
      console.debug('Course code is required!');
      this.props.addToast({
        title: 'Adding course failed',
        message: 'Course code missing',
        level: 'warning',
      });
      return;
    }

    // TODO maybe check if course code exists before server call

    const passingMechanisms = [];

    if (this.state.hasExercises) passingMechanisms.push(`viikkoharjoitukset`);


    if (this.state.hasExam) passingMechanisms.push('tentti');
    if (this.state.hasGroupwork) passingMechanisms.push('ryhmätyö');
    if (this.state.hasDiary) passingMechanisms.push('luentopäiväkirja');
    if (this.state.hasAssignment) passingMechanisms.push('harjoitustyö');
    if (this.state.hasLabAssignment) passingMechanisms.push('laboratoriotyö');

    const periods = [];
    _.each(this.state.periods, (value, key) => {
      if (value) periods.push(key.toUpperCase());
    });

    const res = await fetch(`${globals.API_ADDRESS}/course`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.courseName,
        code: this.state.courseCode,
        mandatoryAttendance: this.state.hasMandatoryAttendance,
        passingMechanisms,
        credits: this.state.credits,
        periods,
      }),
    });
    const data = await res.json();
    console.debug('ADD COURSE response', data);

    if (data.success) {
      console.debug('Add course successful!');
      this.props.url.pushTo(
      /* eslint-disable prefer-template */
        '/?toast=addcourse' +
        '&code=' + this.state.courseCode +
        '&name=' + this.state.courseName
      );
      /* eslint-enable prefer-template */
    } else {
      console.debug('Add course failed');
      this.props.addToast({
        title: 'Adding course failed',
        message: 'Something went wrong :(',
        level: 'error',
      });
    }
  }

  handleTextChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  handleCheckboxChange(field) {
    this.setState({ [field]: !this.state[field] });
  }

  handleHasExercisesChange(value) {
    this.setState({ hasExercises: value });
  }

  handlePeriodChange(period) {
    this.setState({
      periods: { ...this.state.periods, [period]: !this.state.periods[period] },
    });
  }

  handleCreditsChange(event) {
    this.setState({ credits: event.target.value });
  }

  render() {
    return (
      <Page>
        <AddCourseContainer>
          <Title>Add course</Title>
          <Content>
            <Form>
              <BasicInformation>
                <SmallHeader>Basic info</SmallHeader>
                <Label htmlFor='courseName'>Course name</Label>
                <TextField
                  className='form-control'
                  id='courseName'
                  type='text'
                  placeholder='course name'
                  value={this.state.courseName}
                  onChange={this.handleTextChange.bind(this, 'courseName')}
                />

                <Label htmlFor='courseCode'>Course code</Label>
                <TextField
                  className='form-control'
                  id='courseCode'
                  type='text'
                  placeholder='course code'
                  value={this.state.courseCode}
                  onChange={this.handleTextChange.bind(this, 'courseCode')}
                />

              </BasicInformation>

              <Details>
                <SmallHeader>Additional information</SmallHeader>
                <FlexContainer>

                  <PassingMechanisms>
                    <Label>Course content</Label>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.hasExercises}
                        onChange={
                          () => this.handleCheckboxChange('hasExercises')
                        }
                      />
                      <CheckboxText>exercises</CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.hasExam}
                        onChange={
                          () => this.handleCheckboxChange('hasExam')
                        }
                      />
                      <CheckboxText>exam</CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.hasGroupwork}
                        onChange={
                          () => this.handleCheckboxChange('hasGroupwork')
                        }
                      />
                      <CheckboxText>groupwork</CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.hasDiary}
                        onChange={
                          () => this.handleCheckboxChange('hasDiary')
                        }
                      />
                      <CheckboxText>
                        lecture diaries
                      </CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.hasAssignment}
                        onChange={
                          () => this.handleCheckboxChange('hasAssignment')
                        }
                      />
                      <CheckboxText>assignment</CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.hasLabAssignment}
                        onChange={
                          () => this.handleCheckboxChange('hasGroupwork')
                        }
                      />
                      <CheckboxText>lab assignment</CheckboxText>
                    </CheckboxField>
                  </PassingMechanisms>

                  <Periods>
                    <Label>Periods</Label>
                    {['i', 'ii', 'iii', 'iv', 'v'].map(period =>
                      <CheckboxField key={period}>
                        <input
                          type='checkbox'
                          value={this.state.periods[period]}
                          onChange={() => this.handlePeriodChange(period)}
                        />
                        <CheckboxText>{period.toUpperCase()}</CheckboxText>
                      </CheckboxField>
                    )}
                  </Periods>

                  <Misc>
                    <Label>Credits</Label>
                    <TextField
                      className='form-control input-sm'
                      id='credits'
                      type='number'
                      placeholder='credits'
                      value={this.state.credits}
                      onChange={this.handleCreditsChange}
                    />
                    <AttendanceLabel>Mandatory attendance</AttendanceLabel>
                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.hasMandatoryAttendance}
                        onChange={() =>
                          this.handleCheckboxChange('hasMandatoryAttendance')
                        }
                      />
                      <CheckboxText>Yes</CheckboxText>
                    </CheckboxField>
                  </Misc>
                </FlexContainer>
              </Details>
            </Form>
            <AddCourseButton
              className='btn'
              onClick={this.handleSubmit}
            >
              Add course
            </AddCourseButton>
          </Content>
        </AddCourseContainer>
      </Page>
    );
  }
}

addCourse.propTypes = propTypes;

export default withToast(addCourse);
