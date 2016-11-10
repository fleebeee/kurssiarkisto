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
  courseCode: {
    type: String, // this is not strictly needed
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId, // userID
    required: true,
  },
});

// One user can only have one review per course
ReviewSchema.index({ courseCode: 1, userID: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);
