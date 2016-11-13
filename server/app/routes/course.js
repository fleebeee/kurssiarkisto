import express from 'express';
import errorParser from '../utils/errorParser';
// import getToken from '../utils/getToken';

import Course from '../models/course';

const courseRoutes = express.Router();

courseRoutes.post('/course', (req, res) => {
  if (!req.body.name || !req.body.code) {
    res.json({
      success: false,
      message: 'Please enter course name and code.',
    });
  } else {
    const newCourse = new Course({
      name: req.body.name,
      code: req.body.code,
      // The attributes below aren't required, so they can be undefined
      myCoursesLink: req.body.myCoursesLink,
      compulsoryAttendance: req.body.compulsoryAttendance,
      passingMechanisms: req.body.passingMechanisms,
      credits: req.body.credits,
      periods: req.body.periods,
      school: req.body.school,
    });
    // save the course
    newCourse.save((err) => {
      if (err) {
        console.log(err);
        const errors = errorParser(err);

        return res.json({
          success: false,
          message:
            `Something went wrong. Hopefully helpful description:\n${errors}`,
        });
      }
      return res.json({
        success: true,
        message:
          `Successfully added new course ${req.body.code} - ${req.body.name}`,
      });
    });
  }
});

// Get a single course
courseRoutes.get('/course/:code', (req, res) => {
  const code = req.params.code;
  Course.findOne({
    code,
  }, (err, course) => {
    if (err) throw err;
    if (!course) {
      return res.status(404).send({
        success: false,
        message: 'Course not found',
      });
    }
    return res.json({ success: true, course });
  });
});

// Search courses
courseRoutes.get('/search/:keyword', (req, res) => {
  const keyword = req.params.keyword;
  const regexp = new RegExp(keyword, 'i');
  // TODO what if user writes "CS-E4400 Web Services"? This will return []
  Course.find({
    $or: [
      { name: regexp },
      { code: regexp },
    ],
  })
  .limit(10)
  .select('code name credits')
  .lean()
  .exec((err, courses) => {
    if (err) throw err;
    if (!courses.length) {
      // We don't want to spam the console with 403, so send 200
      return res.status(200).send({
        success: false,
        message: 'Courses not found',
      });
    }
    return res.json({ success: true, courses });
  });
});

module.exports = courseRoutes;
