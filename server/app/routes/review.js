import express from 'express';
import mongoose from 'mongoose';
import errorParser from '../utils/errorParser';
// import getToken from '../utils/getToken';

import Review from '../models/review';
import Course from '../models/course';

const reviewRoutes = express.Router();

// Add a new FIRST review
reviewRoutes.post('/review', (req, res) => {
  const score = req.body.score;
  const workload = req.body.workload;
  const courseCode = req.body.courseCode;
  const userID = req.body.userID;

  if (!req.body.score || !req.body.workload) {
    return res.json({
      success: false,
      message: 'Please enter both workload and score',
    });
  } else if (!courseCode || !userID) {
    return res.json({
      success: false,
      message: 'Course code or User ID not given',
    });
  }
  const newReview = new Review({
    score,
    workload,
    courseCode,
    userID: mongoose.Types.ObjectId(userID),
  });

  newReview.save((err) => {
    if (err) {
      console.log(err);
      const errors = errorParser(err);

      return res.json({
        success: false,
        message:
          `Something went wrong. Hopefully helpful description:\n${errors}`,
      });
    }

    // Add Review to Course
    Course.findOne({
      code: courseCode,
    }, (err2, course) => {
      if (err2) throw err;
      if (!course) {
        return res.status(404).send({
          success: false,
          message: 'Course not found when adding review',
        });
      }

      course.reviews.push(newReview._id);

      course.save((err3) => {
        if (err3) {
          newReview.remove((err4) => {
            console.log('Backtracking failed review add failed, PANIC!');
            throw err4;
          });
          throw err3;
        }
        return res.json({
          success: true,
          message: 'Successfully added new review',
        });
      });
      return true;
    });

    return true;
  });

  return true;
});

// Get Reviews for a course by course code
reviewRoutes.get('/review/:code', (req, res) => {
  const code = req.params.code;
  Course.findOne({
    code,
  }, (err, course) => {
    if (err) throw err;
    if (!course) {
      return res.status(404).send({
        success: false,
        message: 'Course not found when getting reviews',
      });
    }

    Review.find({
      _id: { $in: course.reviews },
    }, (err2, reviews) => {
      if (err2) throw err2;

      if (!reviews) {
        return res.status(404).send({
          success: false,
          message: 'Reviews not found for course',
        });
      }

      return res.status(200).json({ success: true, reviews });
    });

    return true;
  });
});

module.exports = reviewRoutes;
