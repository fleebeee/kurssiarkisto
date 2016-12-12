import express from 'express';
import mongoose from 'mongoose';
import errorParser from '../utils/errorParser';
import getToken from '../utils/getToken';
import getUser from '../utils/getUser';

import Review from '../models/review';
import Course from '../models/course';

const reviewRoutes = express.Router();

// Add a new FIRST review
reviewRoutes.post('/review', async (req, res) => {
  const score = req.body.score;
  const workload = req.body.workload;
  const courseCode = req.body.courseCode;

  const user = await getUser(getToken(req.headers));


  if (!req.body.score || !req.body.workload) {
    return res.json({
      success: false,
      message: 'Please enter both workload and score',
    });
  } else if (!courseCode) {
    return res.json({
      success: false,
      message: 'Course code',
    });
  } else if (!user) {
    return res.json({
      success: false,
      message: 'You need to be logged in',
    });
  }

  const newReview = new Review({
    score,
    workload,
    courseCode,
    userID: mongoose.Types.ObjectId(user._id),
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
          review: newReview,
        });
      });
      return true;
    });

    return true;
  });

  return true;
});

// Update review
reviewRoutes.put('/review', async (req, res) => {
  const courseCode = req.body.courseCode;
  const score = req.body.score;
  const workload = req.body.workload;
  const token = getToken(req.headers);
  const user = await getUser(token);

  if (!courseCode) {
    return res.status(404).send({
      success: false,
      message: 'Course code is required',
    });
  }
  if (!user) {
    return res.status(404).send({
      success: false,
      message: 'You need to be logged in',
    });
  }

  // Find the review of this user
  let review = null;
  try {
    review = await Review.findOne({
      userID: user._id,
      courseCode,
    });
  } catch (err) {
    throw err;
  }

  if (!review) {
    return res.status(404).send({
      success: false,
      message: 'Reviews not found for user for this course',
    });
  }

  review.score = score;
  review.workload = workload;
  try {
    await review.save();
    return res.status(200).json({ success: true, review });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: 'Something went wrong :(',
    });
    throw err;
  }
});

// Get Reviews for a course by course code
reviewRoutes.get('/review/:code', async (req, res) => {
  const code = req.params.code;
  const token = getToken(req.headers);
  const user = await getUser(token);

  let course = null;
  try {
    course = await Course.findOne({
      code,
    });
  } catch (err) {
    throw err;
  }

  if (!course) {
    return res.status(404).send({
      success: false,
      message: 'Course not found when getting reviews',
    });
  }

  let reviews = null;
  try {
    reviews = await Review.find({
      _id: { $in: course.reviews },
    });
  } catch (err) {
    throw err;
  }

  if (!reviews) {
    return res.status(404).send({
      success: false,
      message: 'Reviews not found for course',
    });
  }

  // If user is logged in, show them their own review
  if (user) {
    let ownReview = null;

    reviews.forEach((review) => {
      if (review.userID.equals(user._id)) {
        ownReview = review;
      }
      review.userID = undefined;
    });
    return res.status(200).json({ success: true, reviews, ownReview });
  }

  reviews.forEach((review) => {
    review.userID = undefined;
  });

  return res.status(200).json({ success: true, reviews });
});

module.exports = reviewRoutes;
