import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import palette from '../utils/palette.js';
import Page from '../components/Page/Page.js';

// Formatting
const propTypes = {
  url: PropTypes.object,
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
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const QuestionBox = styled.div`
  flex: 1 1 auto;
`;


const SmallHeader = styled.h4`
  text-tranv<SurName>
    <SmallHeader>Sukunimi</SmallHeader>
    <TextField
      className='form-control'
      id='SurName'
      type='text'
      placeholder='sukunimi'
      // value={this.state.firstName}
      // onChange={this.handleFirstNameChange}
    />
  </SurName>sform: uppercase;
  color: ${palette.white};
  margin-top: 3px;
  margin-bottom: 10px;
`;

const TextField = styled.input`
  max-width: 80%;
`;

const CheckboxText = styled.span`
  color: ${palette.white};
  font-size: 0.7em;
  font-weight: 500;
  margin-left: 5px;
  line-height: 1;
  margin-top: 4px;
`;

const CheckboxField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

class Mypage extends Component {

  render() {
    return (
      <Page>
        <myPageContainer>
          <Title>Omat tiedot</Title>
          <Content>
            <Form>
              <QuestionBox>
                <SmallHeader>Etunimi</SmallHeader>
                <TextField
                  className='form-control'
                  id='FirstName'
                  type='text'
                  placeholder='etunimi'
                  // value={this.state.firstName}
                  // onChange={this.handleFirstNameChange}
                />
              </QuestionBox>

              <QuestionBox>
                <SmallHeader>Sukunimi</SmallHeader>
                <TextField
                  className='form-control'
                  id='SurName'
                  type='text'
                  placeholder='sukunimi'
                  // value={this.state.surName}
                  // onChange={this.handleSurNameChange}
                />
              </QuestionBox>

              <QuestionBox>
                <SmallHeader>Sähköposti</SmallHeader>
                <TextField
                  className='form-control'
                  id='Email'
                  type='text'
                  placeholder='sähköpostiosoite'
                  // value={this.state.email}
                  // onChange={this.handleEmailChange}
                />
              </QuestionBox>

              <QuestionBox>
                <SmallHeader>Opintolinja</SmallHeader>
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
                      <span className='caret' />
                    </button>
                    <ul
                      className='dropdown-menu'
                      aria-labelledby='trackDropdown'
                    >
                      <li>
                        <a
                          tabIndex='0'
                          onClick={() =>
                            this.handleTrackChange('tuotantotalous')
                          }
                        >
                          tuotantotalous
                        </a>
                      </li>
                      <li>
                        <a
                          tabIndex='0'
                          onClick={() =>
                            this.handleTrackChange('tietotekniikka')
                          }
                        >
                          tietotekniikka
                        </a>
                      </li>
                      <li>
                        <a
                          tabIndex='0'
                          onClick={() =>
                            this.handleTrackChange('informaatioverkostot')
                          }
                        >
                          informaatioverkostot
                        </a>
                      </li>
                      <li>
                        <a
                          tabIndex='0'
                          onClick={() =>
                            this.handleTrackChange('teknillinen fys. ja mat.')
                          }
                        >
                          teknillinen fys. ja mat.
                        </a>
                      </li>
                      <li>
                        <a
                          tabIndex='0'
                          onClick={() =>
                            this.handleTrackChange('rakennettu ympäristö')
                          }
                        >
                          rakennettu ympäristö
                        </a>
                      </li>
                      <li>
                        <a
                          tabIndex='0'
                          onClick={() =>
                            this.handleTrackChange('prosessitekniikka')
                          }
                        >
                          prosessitekniikka
                        </a>
                      </li>
                      <li>
                        <a
                          tabIndex='0'
                          onClick={() =>
                            this.handleTrackChange('bioinformaatioteknologia')
                          }
                        >
                          bioinformaatioteknologia
                        </a>
                      </li>
                      <li>
                        <a
                          tabIndex='0'
                          onClick={() =>
                            this.handleTrackChange('sähkötekniikka')
                          }
                        >
                          sähkötekniikka
                        </a>
                      </li>
                      <li>
                        <a
                          tabIndex='0'
                          onClick={() =>
                            this.handleTrackChange('Konetekniikka')
                          }
                        >
                          Konetekniikka
                        </a>
                      </li>
                      <li>
                        <a
                          tabIndex='0'
                          onClick={() =>
                            this.handleTrackChange('Rakennustekniikka')
                          }
                        >
                          Rakennustekniikka
                        </a>
                      </li><li>
                        <a
                          tabIndex='0'
                          onClick={() =>
                            this.handleTrackChange('AS')
                          }
                        >
                          AS
                        </a>
                      </li>
                    </ul>
                  </div>
                  <CheckboxText>opintolinja</CheckboxText>
                </CheckboxField>
              </QuestionBox>

              <QuestionBox>
                <SmallHeader>Opintojen aloitusvuosi</SmallHeader>
                <TextField
                  className='form-control'
                  id='FreshmanYear'
                  type='text'
                  placeholder='opintojen aloitusvuosi'
                  // value={this.state.email}
                  // onChange={this.handleEmailChange}
                />
              </QuestionBox>

            </Form>
          </Content>
        </myPageContainer>
      </Page>

    );
  }

}

Mypage.propTypes = propTypes;

export default Mypage;
