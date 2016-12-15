import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import styled from 'styled-components';

const propTypes = {
  value: PropTypes.number.isRequired,
};

// Replace this with your own style
const ReviewStarsContainer = styled.div`
  display: inline;
`;

const StarList = styled.ul`
  display: inline;
  padding: 0;
`;

const Star = styled.li`
  list-style-type: none;
  display: inline;
`;

const roundHalf = num => Math.round(num * 2) / 2;
const fullStar = <i className='ion-battery-full' />;
const halfStar = <i className='ion-battery-low' />;
const emptyStar = <i className='ion-battery-empty' />;


class WorkloadBattery extends Component {
  constructor(props) {
    super(props);
    // Bind class functions here: this.function = this.function.bind(this)
    this.state = {};
  }

  render() {
    const starCount = roundHalf(this.props.value);

    const fullStarCount = Math.floor(starCount);
    const halfStarExists = starCount > fullStarCount + 0.25;

    const stars = [];

    for (let i = 0; i < fullStarCount; i += 1) {
      stars.push(<Star key={i}>{fullStar}</Star>);
    }

    if (halfStarExists) {
      stars.push(<Star key={fullStarCount}>{halfStar}</Star>);
    }

    while (stars.length < 5) {
      stars.push(<Star key={stars.length}>{emptyStar}</Star>);
    }

    return (
      <ReviewStarsContainer>
        <StarList>
          {stars}
        </StarList>
      </ReviewStarsContainer>
    );
  }
}

WorkloadBattery.propTypes = propTypes;

export default WorkloadBattery;
