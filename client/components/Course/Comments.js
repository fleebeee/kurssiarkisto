import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
// import _ from 'lodash';

import globals from '../../utils/globals.js';
import isLoggedIn from '../../utils/isLoggedIn.js';
import palette from '../../utils/palette.js';

import LoadingIndicator from '../LoadingIndicator.js';
import CommentForm from './CommentForm.js';

const propTypes = {
  courseCode: PropTypes.string.isRequired,
};

// Replace this with your own style
const CommentsContainer = styled.div`
  display: block;
`;

const CommentList = styled.ul`
  padding: 0;
`;

const Comment = styled.li`
  list-style-type: none;
  padding: 5px;
  margin-bottom: 5px;
  background-color: ${palette.headerGrey};
  border-radius: 5px;
`;

class Comments extends Component {
  constructor(props) {
    super(props);
    // Bind class functions here: this.function = this.function.bind(this)
    this.state = {
      loggedIn: null,
      comments: false,
    };

    this.getComments = this.getComments.bind(this);
  }

  componentDidMount() {
    // Check if user is logged in
    this.setState({ loggedIn: isLoggedIn() });
    this.getComments();
  }

  async getComments() {
    // Fetch comment data from server
    const res = await fetch(
      `${globals.API_ADDRESS}/comments/${this.props.courseCode}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

    const data = await res.json();
    if (data.success) {
      console.debug('Comment data:', data.comments);
      this.setState({ comments: data.comments });
    } else {
      console.debug('Comments couldn\'t be fetched:', data);
    }
  }

  render() {
    if (!this.state.comments) {
      return <LoadingIndicator />;
    }

    return (
      <CommentsContainer>
        <CommentList>
          {this.state.comments.map(comment =>
            <Comment key={comment._id}>
              {comment.created_at} {comment.nickname}: {comment.content}
              Score: {comment.score}
            </Comment>
          )}
        </CommentList>
        {this.state.loggedIn &&
        <CommentForm
          courseCode={this.props.courseCode}
          getComments={this.getComments}
        />}
      </CommentsContainer>
    );
  }
}

Comments.propTypes = propTypes;

export default Comments;
