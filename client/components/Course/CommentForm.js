import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import _ from 'lodash';
import styled from 'styled-components';

import palette from '../../utils/palette.js';

import globals from '../../utils/globals.js';
import withAuth from '../../utils/withAuth.js';
import withToast from '../../utils/withToast.js';
import AuthService from '../../utils/AuthService.js';

const propTypes = {
  courseCode: PropTypes.string.isRequired,
  auth: PropTypes.instanceOf(AuthService),
  addToast: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
};

// Replace this with your own style
const CommentFormContainer = styled.div`
  display: block;
`;

const StyledTextarea = styled.textarea`
  resize: vertical;
`;

const StyledButton = styled.button`
  background-color: ${palette.white};
  color: ${palette.orange};
  font-weight: bold;
  margin-top: 5px;
`;


class CommentForm extends Component {
  constructor(props) {
    super(props);
    // Bind class functions here: this.function = this.function.bind(this)
    this.state = {
      comment: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  async handleSubmit() {
    if (!_.trim(this.state.comment)) {
      this.props.addToast({
        title: 'Adding comment failed',
        message: 'Please enter a comment',
        level: 'warning',
      });
      return;
    }

    const res = await fetch(
      `${globals.API_ADDRESS}/comment`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.props.auth.getToken(),
        },
        body: JSON.stringify({
          code: this.props.courseCode,
          content: this.state.comment,
        }),
      });

    const data = await res.json();
    if (data.success) {
      this.props.addToast({
        title: 'Comment added!',
        level: 'success',
      });
      // Update comments on parent component
      this.props.getComments();
      this.setState({ comment: '' });
    } else {
      this.props.addToast({
        title: 'Adding comment failed',
        message: 'Something went wrong on our end',
        level: 'error',
      });
    }
  }

  render() {
    return (
      <CommentFormContainer>
        <StyledTextarea
          className='form-control'
          value={this.state.comment}
          onChange={this.handleChange}
        />
        <StyledButton
          className='btn btn-default'
          onClick={this.handleSubmit}
        >
          Submit
        </StyledButton>
      </CommentFormContainer>
    );
  }
}

CommentForm.propTypes = propTypes;

export default withAuth(withToast(CommentForm));
