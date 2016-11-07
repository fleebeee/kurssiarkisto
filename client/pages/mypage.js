import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
// import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import palette from '../utils/palette.js';

import Page from '../components/Page/Page.js';
import AuthService from '../utils/AuthService.js';
import withAuth from '../utils/withAuth.js';


// Formatting
const propTypes = {
  // url: PropTypes.object,
  auth: PropTypes.instanceOf(AuthService),
};

const myPageContainer = styled.div`
  display: block;
`;

const Title = styled.h1`
  text-transform: uppercase;
  color: ${palette.titleGrey};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${palette.brown};
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  min-height: 100%;
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const BasicInformation = styled.div`
  flex: 1 1 auto;
`;

const Password = styled.div`
  flex: 1 1 auto;
`;

const QuestionBox = styled.div`
  flex: 1 1 auto;
`;

const SmallHeader = styled.h4`
text-transform: uppercase;
color: ${palette.white};
margin-top: 15px;
margin-bottom: 5px;
`;

const TextField = styled.input`
  max-width: 80%;
`;

const TextFieldWithPaddings = styled.input`
  max-width: 80%;
  margin-bottom: 15px;
`;

const TrackText = styled.span`
  color: ${palette.titleGrey}
  font-size: 1em;
`;

const DropdownBox = styled.div`
  flex: 1 1 auto;
  max-width: 80%;
`;

const OptionboxField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const SaveMyPageButton = styled.button`
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

class Mypage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.auth.getProfile(),
      firstName: '',
      surName: '',
      email: '',
      track: '',
      freshmanYear: '',
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    };

    this.handleTrackChange = this.handleTrackChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async handleSubmit() {
    console.log('Submitting', this.state);

    if (!this.state.firstName) {
      console.debug('Firstname is required!');
      return;
    }

    if (!this.state.surName) {
      console.debug('Surname is required!');
      return;
    }

    if (!this.state.email) {
      console.debug('Email is required!');
      return;
    }

    if (!this.state.track) {
      console.debug('Track is required!');
      return;
    }

    if (!this.state.freshmanYear) {
      console.debug('Freshman Year is required!');
      return;
    }

    const res = await fetch('http://localhost:3003/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: this.state.firstName,
        surname: this.state.surName,
        email: this.state.email,
        track: this.state.track,
        freshmanYear: this.state.freshmanYear,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
        newPasswordAgain: this.state.newPasswordAgain,
      }),
    });
    const data = await res.json();
    console.debug('MY PAGE response', data);

    if (data.success) {
      console.debug('Save my page successful!');
      // TODO toast and redirect here
    } else {
      console.debug('Save my page failed');
      // TODO toast
    }
  }

  handleTextChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  handleTrackChange(value) {
    this.setState({ track: value });
  }

  render() {
    return (
      <Page>
        <myPageContainer>
          <Title>Omat tiedot</Title>
          <Content>
            <Form>
              <BasicInformation>
                <QuestionBox>
                  <SmallHeader>Etunimi</SmallHeader>
                  <TextField
                    className='form-control'
                    id='firstName'
                    type='text'
                    placeholder='etunimi'
                    value={this.state.firstName}
                    onChange={this.handleTextChange.bind(this, 'firstName')}
                  />
                </QuestionBox>

                <QuestionBox>
                  <SmallHeader>Sukunimi</SmallHeader>
                  <TextField
                    className='form-control'
                    id='surName'
                    type='text'
                    placeholder='sukunimi'
                    value={this.state.surName}
                    onChange={this.handleTextChange.bind(this, 'surName')}
                  />
                </QuestionBox>

                <QuestionBox>
                  <SmallHeader>Sähköposti</SmallHeader>
                  <TextField
                    className='form-control'
                    id='email'
                    type='text'
                    placeholder={this.state.user.data}
                    value={this.state.email}
                    onChange={this.handleTextChange.bind(this, 'email')}
                  />
                </QuestionBox>

                <QuestionBox>
                  <SmallHeader>Opintolinja</SmallHeader>
                  <OptionboxField>
                    <DropdownBox className='dropdown'>
                      <button
                        className='btn btn-xs btn-default dropdown-toggle'
                        type='button'
                        id='dropdownMenu'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='true'
                      >
                        <TrackText>
                          {this.state.track || 'opintolinja'}&nbsp;
                        </TrackText>
                        <span className='caret' />
                      </button>
                      <ul
                        className='dropdown-menu'
                        aria-labelledby='trackDropdown'
                      >
                        {
                          ['TUO', 'TIK', 'INF', 'AUT', 'BTT', 'ENE', 'KON',
                            'TFM', 'RYM', 'RRT', 'BIO', 'EST', 'ARK'].map(
                          option =>
                            <li key={option}>
                              <a
                                tabIndex='0'
                                onClick={() =>
                                  this.handleTrackChange(option)
                                }
                              >
                                {option}
                              </a>
                            </li>
                          )
                        }
                      </ul>
                    </DropdownBox>
                  </OptionboxField>
                </QuestionBox>

                <QuestionBox>
                  <SmallHeader>Opintojen aloitusvuosi</SmallHeader>
                  <TextField
                    className='form-control'
                    id='freshmanYear'
                    type='text'
                    placeholder='opintojen aloitusvuosi'
                    value={this.state.freshmanYear}
                    onChange={this.handleTextChange.bind(this, 'freshmanYear')}
                  />
                </QuestionBox>
              </BasicInformation>

              <Password>
                <QuestionBox>
                  <SmallHeader>Vaihda salasana</SmallHeader>
                  <TextFieldWithPaddings
                    className='form-control'
                    id='oldPassword'
                    type='text'
                    placeholder='nykyinen salasana'
                    value={this.state.oldPassword}
                    onChange={this.handleTextChange}
                  />
                  <TextFieldWithPaddings
                    className='form-control'
                    id='newPassword'
                    type='text'
                    placeholder='uusi salasana'
                    value={this.state.newPassword}
                    onChange={this.handleTextChange}
                  />
                  <TextFieldWithPaddings
                    className='form-control'
                    id='newPasswordAgain'
                    type='text'
                    placeholder='uusi salasana uudestaan'
                    value={this.state.newPasswordAgain}
                    onChange={this.handleTextChange}
                  />
                </QuestionBox>
                <SaveMyPageButton
                  className='btn'
                  onClick={this.handleSubmit}
                >
                  Tallenna muutokset
                </SaveMyPageButton>
              </Password>
            </Form>
          </Content>
        </myPageContainer>
      </Page>

    );
  }

}

Mypage.propTypes = propTypes;

export default withAuth(Mypage);
