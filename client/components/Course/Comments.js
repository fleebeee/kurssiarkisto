import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';
import _ from 'lodash';
import moment from 'moment';

import globals from '../../utils/globals.js';
import isLoggedIn from '../../utils/isLoggedIn.js';
import palette from '../../utils/palette.js';

import LoadingIndicator from '../LoadingIndicator.js';
import CommentForm from './CommentForm.js';
import VoteControls from './VoteControls.js';

const propTypes = {
  courseCode: PropTypes.string.isRequired,
};

// Replace this with your own style
const CommentsContainer = styled.div`
  display: block;
  margin-left: 3px;
  margin-right: 3px;
`;

const CommentList = styled.ul`
  padding: 0;
`;

const Comment = styled.li`
  list-style-type: none;

  background-color: ${palette.white};
  margin-bottom: 12px;

  border-radius: 5px;
`;

const Content = styled.div`
  padding: 8px;
  border-bottom-left-radius: 5px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: ${palette.titleGrey};

  padding-left: 8px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 0px;

  border-bottom: solid 1px #D3D3D3;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.div`
  display: block;
`;

const Timestamp = styled.div`
  font-size: 1.1rem;
`;

const Vote = styled.div`
  margin-left: auto;
  flex: 0;

  display: flex;
  align-items: center;
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
      this.setState({ comments: data.comments });
    }
  }

  render() {
    if (!this.state.comments) {
      return <LoadingIndicator />;
    }

    return (
      <CommentsContainer>
        <CommentList>
          {_.sortBy(this.state.comments,
                   [comment => -comment.score, 'created_at'])
          .map(comment =>
            <Comment key={comment._id}>
              <Header>
                <CommentInfo>
                  <Nickname>
                    {comment.nickname}
                  </Nickname>
                  <Timestamp>
                    {moment(comment.created_at).locale('en-gb').format('LLL')}
                  </Timestamp>
                </CommentInfo>
                <Vote>
                  <div>
                    {comment.score}
                  </div>
                  {this.state.loggedIn &&
                  <VoteControls
                    commentID={comment._id}
                    getComments={this.getComments}
                  />}
                </Vote>
              </Header>
              <Content>
                {comment.content}
              </Content>
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
