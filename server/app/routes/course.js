import express from 'express';
import errorParser from '../utils/errorParser';
import getToken from '../utils/getToken';
import getUser from '../utils/getUser';
// import getToken from '../utils/getToken';

import Course from '../models/course';

const courseRoutes = express.Router();

courseRoutes.post('/course', async (req, res) => {
  if (!req.body.name || !req.body.code) {
    return res.json({
      success: false,
      message: 'Please enter course name and code.',
    });
  }

  const token = getToken(req.headers);
  const user = await getUser(token);
  if (!user) {
    return res.status(403).json({
      success: false,
      message: 'You need to log in to add courses',
    });
  }

  const newCourse = new Course({
    name: req.body.name,
    code: req.body.code,
    // The attributes below aren't required, so they can be undefined
    myCoursesLink: req.body.myCoursesLink,
    mandatoryAttendance: req.body.mandatoryAttendance,
    passingMechanisms: req.body.passingMechanisms,
    credits: req.body.credits,
    instances: req.body.instances,
    school: req.body.school,
  });
  // save the course
  try {
    await newCourse.save();
  } catch (err) {
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
courseRoutes.get('/search/:keyword', async (req, res) => {
  const keyword = req.params.keyword;
  const regexp = new RegExp(keyword, 'i');
  const filters = JSON.parse(req.headers['ka-filters']);
  const sort = JSON.parse(req.headers['ka-sort']);
  // TODO what if user writes "CS-E4400 Web Services"? This will return []

  const find = Course.find({
    $or: [
      { name: regexp },
      { code: regexp },
    ],
  });

  if (filters.length) {
    find.and(filters);
  }

  const courses = await find
  .sort(sort)
  .limit(10)
  .select('code name credits reviews score workload')
  .lean()
  .exec((err) => {
    if (err) throw err;
    return true;
  });

  if (!courses.length) {
    // We don't want to spam the console with 403, so send 200
    return res.status(200).send({
      success: false,
      message: 'Courses not found',
    });
  }

  courses.forEach((course) => {
    course.reviewCount = course.reviews ? course.reviews.length : 0;
    if (course.reviews) {
      delete course.reviews;
    }
  });

  return res.json({ success: true, courses });
});

module.exports = courseRoutes;
