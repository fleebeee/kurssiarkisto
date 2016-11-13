import _ from 'lodash';

// Parse errors to give the client clearer information why there was an error
const errorParser = (err) => {
  let errors = '';
  // Validation errors
  if (_.has(err, 'errors')) {
    _.each(err.errors, (val, key) => {
      /* eslint-disable max-len */
      errors += `${key} error:\nDescription: ${val.message}\nValue that caused this error: ${val.value}\n`;
      /* eslint-enable max-len */
    });
  }

  if (_.has(err, 'name') && _.has(err, 'message')) {
    errors += `${err.name}: ${err.message}\n`;
  }

  return errors;
};

module.exports = errorParser;
