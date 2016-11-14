import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
// import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import palette from '../utils/palette.js';
import globals from '../utils/globals.js';

import Page from '../components/Page/Page.js';
import AuthService from '../utils/AuthService.js';
import withAuth from '../utils/withAuth.js';
import withToast from '../utils/withToast.js';

// Formatting
const propTypes = {
  // url: PropTypes.object,
  addToast: PropTypes.func.isRequired,
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
  font-family: Helvetica;
  font-size: 1.2em;
`;

const TextFieldWithPaddings = styled.input`
  max-width: 80%;
  margin-bottom: 15px;
`;

const TrackText = styled.span`
  color: ${palette.titleGrey}
  font-size: 1.2em;
  font-family: Helvetica;
  padding: 7px;
`;

const DropdownBox = styled.div`
  flex: 1 1 auto;
  max-width: 80%;
`;

const button = styled.button`
  height: 35px;
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
      nickName: '',
      role: '',
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

    const errorTitle = 'Käyttäjätietojen päivitys epäonnistui';
    const missingField = (message) => {
      this.props.addToast({
        title: errorTitle,
        message,
        level: 'warning',
      });
    };


    if (this.state.newPassword !== this.state.newPasswordAgain) {
      console.debug('Passwords dont match!');
      missingField('Tarkista, että toistit salasanan samalla lailla');
    }

    if (this.state.newPassword && !this.state.oldPassword) {
      console.debug('Old Password not filled!');
      missingField('Et voi vaihtaa salasanaa kirjoittamatta vanhaa.');
    }

    if (this.state.oldPassword !== this.state.user.password) {
      console.debug('OldPassword does not match!');
      missingField('Vanha salasana on väärin.');
    }

    const res = await fetch(`${globals.API_ADDRESS}/user`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.auth.getToken(),
      },
      body: JSON.stringify({
        nickname: this.state.nickName,
        role: this.state.role,
        email: this.state.email,
        track: this.state.track,
        startingYear: this.state.freshmanYear,
        password: this.state.newPassword,
      }),
    });
    const data = await res.json();
    console.debug('MY PAGE response', data);

    if (data.success) {
      console.debug('Save my page successful!');
      // TODO toast and redirect here
    } else {
      console.debug('Save my page failed');
      this.props.addToast({
        message: errorTitle,
        level: 'error',
      });
    }
  }

  handleTextChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  handleTrackChange(value) {
    this.setState({ track: value });
  }

  render() {
    console.log(this.state.user);
    return (
      <Page>
        <myPageContainer>
          <Title>Omat tiedot</Title>
          <Content>
            <Form>
              <BasicInformation>
                <QuestionBox>
                  <SmallHeader>Nimimerkki</SmallHeader>
                  <TextField
                    className='form-control'
                    id='nickName'
                    type='text'
                    placeholder={this.state.user.nickname || 'nimimerkki'}
                    value={this.state.nickName}
                    onChange={this.handleTextChange.bind(this, 'nickName')}
                  />
                </QuestionBox>

                <QuestionBox>
                  <SmallHeader>Sähköposti</SmallHeader>
                  <TextField
                    className='form-control'
                    id='email'
                    type='text'
                    placeholder={this.state.user.email}
                    value={this.state.email}
                    onChange={this.handleTextChange.bind(this, 'email')}
                  />
                </QuestionBox>

                <QuestionBox>
                  <SmallHeader>Rooli</SmallHeader>
                  <TextField
                    className='form-control'
                    id='role'
                    type='text'
                    placeholder={this.state.user.role || 'opiskelija'}
                    value={this.state.role}
                    onChange={this.handleTextChange.bind(this, 'role')}
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
                          {this.state.user.track || this.state.track}&nbsp;
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
                    type='number'
                    placeholder={this.state.user.startingYear ||
                      'opintojen aloitusvuosi'}
                    value={this.state.freshmanYear}
                    onChange={
                      this.handleTextChange.bind(this, 'freshmanYear')
                    }
                  />
                </QuestionBox>
              </BasicInformation>

              <Password>
                <QuestionBox>
                  <SmallHeader>Vaihda salasana</SmallHeader>
                  <TextFieldWithPaddings
                    className='form-control'
                    id='oldPassword'
                    type='password'
                    placeholder='nykyinen salasana'
                    value={this.state.oldPassword}
                    onChange={this.handleTextChange.bind(this, 'oldPassword')}
                  />
                  <TextFieldWithPaddings
                    className='form-control'
                    id='newPassword'
                    type='password'
                    placeholder='uusi salasana'
                    value={this.state.newPassword}
                    onChange={this.handleTextChange.bind(this, 'newPassword')}
                  />
                  <TextFieldWithPaddings
                    className='form-control'
                    id='newPasswordAgain'
                    type='password'
                    placeholder='uusi salasana uudestaan'
                    value={this.state.newPasswordAgain}
                    onChange={this.handleTextChange.bind(this,
                      'newPasswordAgain')}
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

export default withAuth(withToast(Mypage));
