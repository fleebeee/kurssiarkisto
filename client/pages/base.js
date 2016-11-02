import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import css from 'next/css';

const propTypes = {
  url: PropTypes.object.isRequired,
};

const baseStyle = css({
  div: 'block',
});

class Base extends Component {
  constructor(props) {
    super(props);
    // Bind class functions here: this.function = this.function.bind(this)
    this.state = {};
  }

  render() {
    return (
      <div className={baseStyle}>
        Base
      </div>
    );
  }
}

Base.propTypes = propTypes;

export default Base;
