// A HOC for pages that need toasts
import React, { Component, PropTypes } from 'react';
import NotificationSystem from 'react-notification-system';

/* eslint-disable react/no-unused-prop-types */
const propTypes = {
  url: PropTypes.object.isRequired,
};

export default (ToastComponent) => {
  class Toasted extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.addToast = this.addToast.bind(this);
    }

    addToast(options) {
      this.notificationSystem.addNotification({
        title: options.title,
        message: options.message,
        level: options.level || 'success',
        position: 'tc',
      });
    }

    render() {
      return (
        <div>
          <NotificationSystem ref={(c) => { this.notificationSystem = c; }} />
          <ToastComponent {...this.props} addToast={this.addToast} />
        </div>
      );
    }
  }

  Toasted.propTypes = propTypes;
  return Toasted;
};
