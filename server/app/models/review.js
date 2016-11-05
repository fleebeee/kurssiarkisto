var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  reviewID: {
    type: String, // how is this generated?
    required: true,
    unique: true,
  },
  workload: {
    type: Number, // a number from 0 to 5
    required: true
  },
  score: {
    type: Number, // a number from 0 to 5
    required: true,
  },
  courseID: {
    type: String, // is this the course code or is a separate ID used?
    required: true,
  },
  userID: {
    type: String, // is this the user email or is a separate ID used?
    required: true,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
