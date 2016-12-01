import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

import globals from '../../utils/globals.js';
import withAuth from '../../utils/withAuth.js';
import AuthService from '../../utils/AuthService.js';

const propTypes = {
  courseCode: PropTypes.string.isRequired,
  auth: PropTypes.instanceOf(AuthService),
  getComments: PropTypes.func.isRequired,
};

// Replace this with your own style
const CommentFormContainer = styled.div`
  display: block;
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
    // TODO trim comment and display toasts
    if (!this.state.comment) {
      console.log('Please enter a comment');
      return;
    }

    const res = await fetch(
      `${globals.API_ADDRESS}/comment`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: this.props.auth.getProfile().id,
          code: this.props.courseCode,
          content: this.state.comment,
        }),
      });

    const data = await res.json();
    if (data.success) {
      // TODO toast
      console.debug('Comment post data:', data);
      // Update comments on parent component
      this.props.getComments();
      this.setState({ comment: '' });
    } else {
      console.debug('Post comment failed', data);
    }
  }

  render() {
    return (
      <CommentFormContainer>
        <textarea
          className='form-control'
          value={this.state.comment}
          onChange={this.handleChange}
        />
        <button
          className='btn btn-default'
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </CommentFormContainer>
    );
  }
}

CommentForm.propTypes = propTypes;

export default withAuth(CommentForm);
