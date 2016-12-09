import React, { Component, PropTypes } from 'react';
// import fetch from 'isomorphic-fetch';
// import ls from 'local-storage';
import _ from 'lodash';
import styled from 'styled-components';

import globals from '../../utils/globals.js';

const propTypes = {
  something: PropTypes.any,
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
    this.state = {
      newId: 1,
      instances: {
        0: {
          id: 0,
          startPeriod: Object.keys(globals.PERIODS)[0],
          endPeriod: Object.keys(globals.PERIODS)[0],
        },
      },
    };

    this.renderInstance = this.renderInstance.bind(this);
    this.addInstance = this.addInstance.bind(this);
    this.removeInstance = this.removeInstance.bind(this);
  }

  handleSelection(id, startPeriod, endPeriod) {
    if (globals.PERIODS[startPeriod] > globals.PERIODS[endPeriod]) {
      if (startPeriod === this.state.instances[id].startPeriod) {
        startPeriod = endPeriod;
      } else {
        endPeriod = startPeriod;
      }
    }

    this.setState({
      instances: {
        ...this.state.instances,
        [id]: {
          id,
          startPeriod,
          endPeriod,
        },
      },
    });
  }

  addInstance(event) {
    event.preventDefault();

    const newId = this.state.newId;
    this.setState({
      newId: this.state.newId + 1,
      instances: {
        ...this.state.instances,
        [newId]: {
          id: newId,
          startPeriod: Object.keys(globals.PERIODS)[0],
          endPeriod: Object.keys(globals.PERIODS)[0],
        },
      },
    });
  }

  removeInstance(id) {
    const newInstances = _.cloneDeep(this.state.instances);
    delete newInstances[id];
    this.setState({ instances: newInstances });
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
                    this.handleSelection(
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
                    this.handleSelection(
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
          onClick={() => this.removeInstance(instance.id)}
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
        {Object.values(this.state.instances).map(this.renderInstance)}
        <button
          className='btn btn-default'
          onClick={this.addInstance}
        >
          Add another instance
        </button>
      </PeriodSelectorContainer>
    );
  }
}

PeriodSelector.propTypes = propTypes;

export default PeriodSelector;
