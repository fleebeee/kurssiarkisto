import mongoose from 'mongoose';
import Review from './review';

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String, // 'Design of WWW Services'
    required: [true, 'Course name is required'],
  },
  code: {
    type: String, // 'CS-E4400'
    required: [true, 'Course code is required'],
    // 'Primary key', let's trust Aalto not to have duplicate course codes
    unique: [true, 'Course code has to be unique'],
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
  comments: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
  myCoursesLink: {
    type: String,
    validate: {
      validator: (v) => {
        /* eslint-disable max-len */
        return /^$|^https:\/\/mycourses\.aalto\.fi\/course\/view\.php\?id=[0-9]+$/g.test(v);
      },
      message: '\'{VALUE}\' is not a valid MyCoursesLink. It should satisfy this RegExp: /^$|^https:\\/\\/mycourses\\.aalto\\.fi\\/course\\/view\\.php\\?id=[0-9]+$/g',
      /* eslint-enable max-len */
    },
    required: false,
  },
  tenttiArkistoLink: {
    type: String,
    validate: {
      validator: (v) => {
        /* eslint-disable max-len */
        return /^$|^http:\/\/tenttiarkisto\.fi.*$/g.test(v);
      },
      message: '\'{VALUE}\' is not a valid TenttiArkisto link. It should satisfy this RegExp: ',
      /* eslint-enable max-len */
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
    required: false,
  },
  instances: {
    type: [], // [{ startPeriod: 'I', endPeriod: 'III'}, { ... }] for example
    required: false,
  },
  // Approximate values for sorting
  score: {
    type: Number,
    required: false,
  },
  workload: {
    type: Number,
    required: false,
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

CourseSchema.pre('save', async function s(next) {
  const course = this;
  if (this.isNew) {
    course.score = 0;
    course.workload = 0;
  } else if (this.isModified('reviews')) {
    let reviews = [];
    try {
      reviews = await Review.find({
        _id: { $in: course.reviews },
      });
      reviews = reviews.map(r => r.toObject());
    } catch (err) {
      throw err;
    }

    let scoreSum = 0;
    let workloadSum = 0;

    reviews.forEach((review) => {
      scoreSum += review.score;
      workloadSum += review.workload;
    });

    if (reviews.length > 0) {
      scoreSum /= reviews.length;
      workloadSum /= reviews.length;
    }

    course.score = scoreSum;
    course.workload = workloadSum;
  }
  return next();
});

module.exports = mongoose.model('Course', CourseSchema);
