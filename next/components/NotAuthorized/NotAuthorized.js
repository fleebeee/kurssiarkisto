import React, { PropTypes } from 'react';

import LoadingIndicator from '../LoadingIndicator.js';
import Unauthorized from './Unauthorized.js';

const propTypes = {
  status: PropTypes.string.isRequired,
};

const NotAuthorized = (props) => {
  if (props.status === 'pending') {
    return (
      <div>
        <LoadingIndicator />
      </div>
    );
  }
  return (
    <div>
      <Unauthorized />
    </div>
  );
};

NotAuthorized.propTypes = propTypes;

export default NotAuthorized;
