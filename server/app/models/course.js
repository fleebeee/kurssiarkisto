var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  name: {
    type: String, // 'Design of WWW Services'
    required: [true, 'Course name is required'],
  },
  code: {
    type: String, // 'CS-E4400'
    required: [true, 'Course code is required'],
    unique: [true, 'Course code has to be unique'], // 'Primary key', let's trust Aalto not to have duplicate course codes
  },
  reviews: {
    type: [Schema.Types.Objectid],
    required: false,
  },
  comments: {
    type: [Schema.Types.Objectid],
    required: false,
  },
  myCoursesLink: {
    type: String,
    validate: {
      validator: function(v) {
        return /^$|^https:\/\/mycourses\.aalto\.fi\/course\/view\.php\?id\=[0-9]+$/g.test(v);
      },
      message: '\'{VALUE}\' is not a valid MyCoursesLink. It should satisfy this RegExp: /^$|^https:\/\/mycourses\.aalto\.fi\/course\/view\.php\?id\=[0-9]+$/g'
    },
    required: false,
  },
  mandatoryAttendance: {
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
