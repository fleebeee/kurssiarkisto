var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  name: {
    type: String, // 'Design of WWW Services'
    required: true,
  },
  code: {
    type: String, // 'CS-E4400'
    required: true,
    unique: true, // Primary key, let's trust Aalto not to have duplicate course codes
  },
  myCoursesLink: {
    type: String, // NOTE Validate this
    required: false,
  },
  compulsoryAttendance: {
    type: Boolean,
    required: false,
  },
  passingMechanisms: {
    type: [String], // Array of strings: ['Exam', 'Group work']
    required: false,
  },
  credits: {
    type: Number,
    required: false
  },
  periods: {
    type: [String], // ['I', 'III-IV' ] for example
    required: false,
  },
  school: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Course', CourseSchema);
