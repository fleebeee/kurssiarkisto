var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  workload: {
    type: Number, // a number from 0 to 5
    required: true
  },
  score: {
    type: Number, // a number from 0 to 5
    required: true,
  },
  courseID: {
    type: String, // courseID
    required: true,
  },
  userID: {
    type: String, // userID
    required: true,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
