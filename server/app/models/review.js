var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  workload: {
    type: Number, // a number from 0 to 5
    required: true,
  },
  score: {
    type: Number, // a number from 0 to 5
    required: true,
  },
  courseID: {
    type: Schema.Types.Objectid, // courseID
    required: true,
  },
  userID: {
    type: Schema.Types.Objectid, // userID
    required: true,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
