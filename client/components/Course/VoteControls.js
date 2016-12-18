import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

import globals from '../../utils/globals.js';
import withAuth from '../../utils/withAuth.js';
import AuthService from '../../utils/AuthService.js';

const propTypes = {
  commentID: PropTypes.string.isRequired,
  auth: PropTypes.instanceOf(AuthService),
  getComments: PropTypes.func.isRequired,
};

const VoteControlsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin-left: 5px;
`;

const Upvote = styled.i`
  &:hover {
    color: green;
  }
`;

const Downvote = styled.i`
  &:hover {
    color: red;
  }
`;

class VoteControls extends Component {
  constructor(props) {
    super(props);
    // Bind class functions here: this.function = this.function.bind(this)
    this.state = {};
  }

  async handleVote(commentID, vote) {
    const res = await fetch(
      `${globals.API_ADDRESS}/comment`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.props.auth.getToken(),
        },
        body: JSON.stringify({
          commentID,
          vote,
        }),
      });

    const data = await res.json();
    if (data.success) {
      // TODO Update view on parent component
      // Preferably not like this!!
      this.props.getComments();
    }
  }

  render() {
    const { commentID } = this.props;
    return (
      <VoteControlsContainer>
        <Upvote
          className='ion-arrow-up-a'
          onClick={() => this.handleVote(commentID, 1)}
        />
        <Downvote
          className='ion-arrow-down-a'
          onClick={() => this.handleVote(commentID, -1)}
        />
      </VoteControlsContainer>
    );
  }
}

VoteControls.propTypes = propTypes;

export default withAuth(VoteControls);
