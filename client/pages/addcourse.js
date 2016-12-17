import React, { Component, PropTypes } from 'react';

import _ from 'lodash';
import styled from 'styled-components';
import palette from '../utils/palette.js';
import globals from '../utils/globals.js';

import AuthService from '../utils/AuthService.js';
import withToast from '../utils/withToast.js';
import withAuth from '../utils/withAuth.js';
import Page from '../components/Page/Page.js';
import PeriodSelector from '../components/AddCourse/PeriodSelector.js';

const propTypes = {
  auth: PropTypes.instanceOf(AuthService),
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

      tenttiArkistoLink: '',
      myCoursesLink: '',

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

      newPeriodId: 1,
      instances: {
        0: {
          id: 0,
          startPeriod: Object.keys(globals.PERIODS)[0],
          endPeriod: Object.keys(globals.PERIODS)[0],
        },
      },

      credits: '',
      hasMandatoryAttendance: false,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleHasExercisesChange = this.handleHasExercisesChange.bind(this);
    this.handleCreditsChange = this.handleCreditsChange.bind(this);

    this.handlePeriodSelection = this.handlePeriodSelection.bind(this);
    this.addInstance = this.addInstance.bind(this);
    this.removeInstance = this.removeInstance.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    if (!this.state.courseName) {
      this.props.addToast({
        title: 'Adding course failed',
        message: 'Course name missing',
        level: 'warning',
      });
      return;
    }

    if (!this.state.courseCode) {
      this.props.addToast({
        title: 'Adding course failed',
        message: 'Course code missing',
        level: 'warning',
      });
      return;
    }

    if (!Object.keys(this.state.instances).length) {
      this.props.addToast({
        title: 'Adding course failed',
        message: 'At least one instance is required',
        level: 'warning',
      });
      return;
    }

    // TODO maybe check if course code exists before server call

    const passingMechanisms = [];

    if (this.state.hasExercises) {
      passingMechanisms.push(globals.PASSING_MECHANISMS.EXERCISES);
    }
    if (this.state.hasExam) {
      passingMechanisms.push(globals.PASSING_MECHANISMS.EXAM);
    }
    if (this.state.hasGroupwork) {
      passingMechanisms.push(globals.PASSING_MECHANISMS.GROUP_WORK);
    }
    if (this.state.hasDiary) {
      passingMechanisms.push(globals.PASSING_MECHANISMS.LECTURE_DIARIES);
    }
    if (this.state.hasAssignment) {
      passingMechanisms.push(globals.PASSING_MECHANISMS.ASSIGNMENT);
    }
    if (this.state.hasLabAssignment) {
      passingMechanisms.push(globals.PASSING_MECHANISMS.LAB_ASSIGNMENT);
    }

    const instances = Object.values(this.state.instances);
    instances.forEach(instance => delete instance.id);

    const res = await this.props.auth.authFetch(
      `${globals.API_ADDRESS}/course`,
      {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.courseName,
          code: this.state.courseCode,
          myCoursesLink: this.state.myCoursesLink,
          tenttiArkistoLink: this.state.tenttiArkistoLink,
          mandatoryAttendance: this.state.hasMandatoryAttendance,
          passingMechanisms,
          credits: this.state.credits,
          instances,
        }),
      }
   );

    if (res.success) {
      this.props.url.pushTo(
      /* eslint-disable prefer-template */
        '/?toast=addcourse' +
        '&code=' + this.state.courseCode +
        '&name=' + this.state.courseName
      );
      /* eslint-enable prefer-template */
    } else {
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

  handleCreditsChange(event) {
    this.setState({ credits: event.target.value });
  }

  handlePeriodSelection(id, startPeriod, endPeriod) {
    if (globals.PERIODS[startPeriod] > globals.PERIODS[endPeriod]) {
      if (startPeriod === this.state.instances[id].startPeriod) {
        startPeriod = endPeriod;
      } else {
        endPeriod = startPeriod;
      }
    }

    this.setState({
      instances: {
        ...this.state.instances,
        [id]: {
          id,
          startPeriod,
          endPeriod,
        },
      },
    });
  }

  addInstance(event) {
    event.preventDefault();

    const newId = this.state.newPeriodId;
    this.setState({
      newPeriodId: this.state.newPeriodId + 1,
      instances: {
        ...this.state.instances,
        [newId]: {
          id: newId,
          startPeriod: Object.keys(globals.PERIODS)[0],
          endPeriod: Object.keys(globals.PERIODS)[0],
        },
      },
    });
  }

  removeInstance(id) {
    const newInstances = _.cloneDeep(this.state.instances);
    delete newInstances[id];
    this.setState({ instances: newInstances });
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
                <br/>
                <SmallHeader>Links</SmallHeader>
                <Label htmlFor='myCoursesLink'>MyCourses</Label>
                <TextField
                  className='form-control'
                  id='myCoursesLink'
                  type='text'
                  placeholder='link to mycourses page'
                  value={this.state.myCoursesLink}
                  onChange={this.handleTextChange.bind(this, 'myCoursesLink')}
                />

                <Label htmlFor='tenttiArkistoLink'>Tenttiarkisto</Label>
                <TextField
                  className='form-control'
                  id='tenttiArkistoLink'
                  type='text'
                  placeholder='link to tenttiarkisto page'
                  value={this.state.tenttiArkistoLink}
                  onChange={this.handleTextChange.bind(this, 'tenttiArkistoLink')}
                />
                <br/>

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
                    <PeriodSelector
                      instances={this.state.instances}
                      addInstance={this.addInstance}
                      removeInstance={this.removeInstance}
                      handleSelection={this.handlePeriodSelection}
                    />
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
                      <CheckboxText>yes</CheckboxText>
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

export default withAuth(withToast(addCourse));
