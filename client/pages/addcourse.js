import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
import palette from '../utils/palette.js';

import Page from '../components/Page/Page.js';

const propTypes = {
  url: PropTypes.object,
};

const addCourseContainer = styled.div`
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
  font-size: 0.7em;
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
  font-size: 0.7em;
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
      school: '',

      hasExam: false,
      hasExercises: '',
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

    this.handleCourseNameChange = this.handleCourseNameChange.bind(this);
    this.handleCourseCodeChange = this.handleCourseCodeChange.bind(this);
    this.handleSchoolChange = this.handleSchoolChange.bind(this);

    this.handleHasExamChange = this.handleHasExamChange.bind(this);
    this.handleHasExercisesChange = this.handleHasExercisesChange.bind(this);
    this.handleHasGroupworkChange = this.handleHasGroupworkChange.bind(this);
    this.handleHasDiaryChange = this.handleHasDiaryChange.bind(this);
    this.handleHasAssignmentChange = this.handleHasAssignmentChange.bind(this);
    this.handleHasLabAssignmentChange
      = this.handleHasLabAssignmentChange.bind(this);

    this.handleIPeriodChange = this.handleIPeriodChange.bind(this);
    this.handleIIPeriodChange = this.handleIIPeriodChange.bind(this);
    this.handleIIIPeriodChange = this.handleIIIPeriodChange.bind(this);
    this.handleIVPeriodChange = this.handleIVPeriodChange.bind(this);
    this.handleVPeriodChange = this.handleVPeriodChange.bind(this);

    this.handleCreditsChange = this.handleCreditsChange.bind(this);
    this.handleHasMandatoryAttendanceChange =
      this.handleHasMandatoryAttendanceChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

/*
courseName: '',
courseCode: '',
school: '',

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
*/

  async handleSubmit() {
    console.log('Submitting', this.state);

    if (!this.state.courseName) {
      console.debug('Course name is required!');
      return;
    }

    if (!this.state.courseCode) {
      console.debug('Course code is required!');
      return;
    }

    // TODO maybe check if course code exists before server call

    const passingMechanisms = [];

    if (this.state.hasExam) {
      passingMechanisms.push('tentti');
    }

    if (this.state.hasExercises && this.stateHasExercises !== 'ei') {
      passingMechanisms.push(`${this.state.hasExercises} viikkoharjoitukset`);
    }

    if (this.state.hasGroupwork) {
      passingMechanisms.push('ryhmätyö');
    }

    if (this.state.hasDiary) {
      passingMechanisms.push('luentopäiväkirja');
    }

    if (this.state.hasAssignment) {
      passingMechanisms.push('harjoitustyö');
    }

    if (this.state.hasLabAssignment) {
      passingMechanisms.push('laboratoriotyö');
    }

    // This could be more elegant...
    const periods = [];
    if (this.state.periods.i) periods.push('I');
    if (this.state.periods.ii) periods.push('II');
    if (this.state.periods.iii) periods.push('III');
    if (this.state.periods.iv) periods.push('IV');
    if (this.state.periods.v) periods.push('V');

    const res = await fetch('http://localhost:3003/course', {
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
        school: this.state.school,
      }),
    });
    const data = await res.json();
    console.debug('ADD COURSE response', data);
  }

  handleCourseNameChange(event) {
    this.setState({ courseName: event.target.value });
  }

  handleCourseCodeChange(event) {
    this.setState({ courseCode: event.target.value });
  }

  handleSchoolChange(event) {
    this.setState({ school: event.target.value });
  }

  handleHasExamChange() {
    this.setState({ hasExam: !this.state.hasExam });
  }

  handleHasExercisesChange(value) {
    this.setState({ hasExercises: value });
  }

  handleHasGroupworkChange() {
    this.setState({ hasGroupwork: !this.state.hasGroupwork });
  }

  handleHasDiaryChange() {
    this.setState({ hasDiary: !this.state.hasDiary });
  }

  handleHasAssignmentChange() {
    this.setState({ hasAssignment: !this.state.hasAssignment });
  }

  handleHasLabAssignmentChange() {
    this.setState({ hasLabAssignment: !this.state.hasLabAssignment });
  }

  handleIPeriodChange() {
    this.setState({
      periods: { ...this.state.periods, i: !this.state.periods.i },
    });
  }

  handleIIPeriodChange() {
    this.setState({
      periods: { ...this.state.periods, ii: !this.state.periods.ii },
    });
  }

  handleIIIPeriodChange() {
    this.setState({
      periods: { ...this.state.periods, iii: !this.state.periods.iii },
    });
  }

  handleIVPeriodChange() {
    this.setState({
      periods: { ...this.state.periods, iv: !this.state.periods.iv },
    });
  }

  handleVPeriodChange() {
    this.setState({
      periods: { ...this.state.periods, v: !this.state.periods.v },
    });
  }

  handleCreditsChange(event) {
    this.setState({ credits: event.target.value });
  }

  handleHasMandatoryAttendanceChange() {
    this.setState({
      hasMandatoryAttendance: !this.state.hasMandatoryAttendance,
    });
  }

  render() {
    return (
      <Page>
        <addCourseContainer>
          <Title>Lisää kurssi</Title>
          <Content>
            <Form>
              <BasicInformation>
                <SmallHeader>Perustiedot</SmallHeader>
                <Label htmlFor='courseName'>Kurssin nimi</Label>
                <TextField
                  className='form-control'
                  id='courseName'
                  type='text'
                  placeholder='kurssin nimi'
                  value={this.state.courseName}
                  onChange={this.handleCourseNameChange}
                />

                <Label htmlFor='courseCode'>Kurssikoodi</Label>
                <TextField
                  className='form-control'
                  id='courseCode'
                  type='text'
                  placeholder='kurssikoodi'
                  value={this.state.courseCode}
                  onChange={this.handleCourseCodeChange}
                />

                <Label htmlFor='school'>Korkeakoulu</Label>
                <TextField
                  className='form-control'
                  id='school'
                  type='text'
                  placeholder='korkeakoulu'
                  value={this.state.school}
                  onChange={this.handleSchoolChange}
                />
              </BasicInformation>

              <Details>
                <SmallHeader>Lisätiedot</SmallHeader>
                <FlexContainer>

                  <PassingMechanisms>
                    <Label>Suoritusmuodot</Label>

                    <CheckboxField>
                      <div className='dropdown'>
                        <button
                          className='btn btn-xs btn-default dropdown-toggle'
                          type='button'
                          id='dropdownMenu'
                          data-toggle='dropdown'
                          aria-haspopup='true'
                          aria-expanded='true'
                        >
                          <ExerciseText>
                            {this.state.hasExercises || 'valitse'}&nbsp;
                          </ExerciseText>
                          <span className='caret' />
                        </button>
                        <ul
                          className='dropdown-menu'
                          aria-labelledby='exercisesDropdown'
                        >
                          <li>
                            <a
                              tabIndex='0'
                              onClick={() =>
                                this.handleHasExercisesChange('ei')
                              }
                            >
                              ei
                            </a>
                          </li>
                          <li>
                            <a
                              tabIndex='0'
                              onClick={() =>
                                this.handleHasExercisesChange('vapaaehtoiset')
                              }
                            >
                              vapaaehtoiset
                            </a>
                          </li>
                          <li>
                            <a
                              tabIndex='0'
                              onClick={() =>
                                this.handleHasExercisesChange('pakolliset')
                              }
                            >
                              pakolliset
                            </a>
                          </li>
                        </ul>
                      </div>
                      <CheckboxText>viikkoharjoitukset</CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.hasExam}
                        onChange={this.handleHasExamChange}
                      />
                      <CheckboxText>tentti</CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.hasGroupwork}
                        onChange={this.handleHasGroupworkChange}
                      />
                      <CheckboxText>ryhmätyö</CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.hasDiary}
                        onChange={this.handleHasDiaryChange}
                      />
                      <CheckboxText>
                        luentopäiväkirja
                      </CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.hasAssignment}
                        onChange={this.handleHasAssignmentChange}
                      />
                      <CheckboxText>harjoitustyö</CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.hasLabAssignment}
                        onChange={this.handleHasLabAssignmentChange}
                      />
                      <CheckboxText>laboratoriotyö</CheckboxText>
                    </CheckboxField>
                  </PassingMechanisms>

                  <Periods>
                    <Label>Periodi</Label>
                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.periods.i}
                        onChange={this.handleIPeriodChange}
                      />
                      <CheckboxText>I</CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.periods.ii}
                        onChange={this.handleIIPeriodChange}
                      />
                      <CheckboxText>II</CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.periods.iii}
                        onChange={this.handleIIIPeriodChange}
                      />
                      <CheckboxText>III</CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.periods.iv}
                        onChange={this.handleIVPeriodChange}
                      />
                      <CheckboxText>IV</CheckboxText>
                    </CheckboxField>

                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.periods.v}
                        onChange={this.handleVPeriodChange}
                      />
                      <CheckboxText>V</CheckboxText>
                    </CheckboxField>
                  </Periods>

                  <Misc>
                    <Label>Opintopisteet</Label>
                    <TextField
                      className='form-control input-sm'
                      id='credits'
                      type='number'
                      placeholder='opintopisteet'
                      value={this.state.credits}
                      onChange={this.handleCreditsChange}
                    />
                    <AttendanceLabel>Läsnäolopakko</AttendanceLabel>
                    <CheckboxField>
                      <input
                        type='checkbox'
                        value={this.state.hasMandatoryAttendance}
                        onChange={this.handleHasMandatoryAttendanceChange}
                      />
                      <CheckboxText>kyllä</CheckboxText>
                    </CheckboxField>
                  </Misc>
                </FlexContainer>
              </Details>
            </Form>
            <AddCourseButton
              className='btn'
              onClick={this.handleSubmit}
            >
              Lisää kurssi
            </AddCourseButton>
          </Content>
        </addCourseContainer>
      </Page>
    );
  }
}

addCourse.propTypes = propTypes;

export default addCourse;
