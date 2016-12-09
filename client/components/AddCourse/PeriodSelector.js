import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
// import _ from 'lodash';
import styled from 'styled-components';

import globals from '../../utils/globals.js';

const propTypes = {
  instances: PropTypes.object.isRequired,
  addInstance: PropTypes.func.isRequired,
  removeInstance: PropTypes.func.isRequired,
  handleSelection: PropTypes.func.isRequired,
};

// Replace this with your own style
const PeriodSelectorContainer = styled.div`
  display: block;
`;

const PeriodDropdown = styled.div`
  display: inline-block;
`;

const To = styled.span`
  margin-left: 5px;
  margin-right: 5px;
`;

class PeriodSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderInstance = this.renderInstance.bind(this);
  }

  renderInstance(instance) {
    return (
      <div key={instance.id}>
        <PeriodDropdown className='dropdown'>
          <button
            className='btn btn-default btn-xs dropdown-toggle'
            type='button'
            id={`startPeriod${instance.id}`}
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='true'
          >
            {instance.startPeriod}
            <span className='caret' />
          </button>
          <ul
            className='dropdown-menu'
            aria-labelledby={`startPeriod${instance.id}`}
          >
            {Object.keys(globals.PERIODS).map(period =>
              <li key={period}>
                <a
                  tabIndex={globals.PERIODS[period]}
                  onClick={() =>
                    this.props.handleSelection(
                      instance.id, period, instance.endPeriod)}
                >
                  {period}
                </a>
              </li>
            )}
          </ul>
        </PeriodDropdown>
        <To>to</To>
        <PeriodDropdown className='dropdown'>
          <button
            className='btn btn-default btn-xs dropdown-toggle'
            type='button'
            id={`endPeriod${instance.id}`}
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='true'
          >
            {instance.endPeriod}
            <span className='caret' />
          </button>
          <ul
            className='dropdown-menu'
            aria-labelledby={`endPeriod${instance.id}`}
          >
            {Object.keys(globals.PERIODS).map(period =>
              <li key={period}>
                <a
                  tabIndex={globals.PERIODS[period]}
                  onClick={() =>
                    this.props.handleSelection(
                      instance.id, instance.startPeriod, period)}
                >
                  {period}
                </a>
              </li>
            )}
          </ul>
        </PeriodDropdown>
        <a
          tabIndex={instance.id}
          onClick={() => this.props.removeInstance(instance.id)}
        >
          <i
            className='ion-ios-trash'
          />
        </a>
      </div>
    );
  }

  render() {
    return (
      <PeriodSelectorContainer>
        {Object.values(this.props.instances).map(this.renderInstance)}
        <button
          className='btn btn-default'
          onClick={this.props.addInstance}
        >
          Add another instance
        </button>
      </PeriodSelectorContainer>
    );
  }
}

PeriodSelector.propTypes = propTypes;

export default PeriodSelector;
