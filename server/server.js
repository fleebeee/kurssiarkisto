var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors')
var mongoose = require('mongoose');
var passport = require('passport');
var port = process.env.PORT || 3003;
var jwt = require('jwt-simple');
var _ = require('lodash');

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());

// Database config
var config = require('./config/database');
require('./config/passport')(passport);

// Database models
var User = require('./app/models/user');
var Course = require('./app/models/course');
var Review = require('./app/models/review');
var Comment = require('./app/models/comment');

mongoose.Promise = require('bluebird');
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

// Parse errors to give the client clearer information why there was an error
var errorParser = function(err) {
  var errors = '';
  // Validation errors
  if (_.has(err, 'errors')) {
    _.each(err.errors, function(val, key) {
      errors += `${key} error:\nDescription: ${val.message}\nValue that caused this error: ${val.value}\n`;
    });
  }

  if (_.has(err, 'name') && _.has(err, 'message')) {
    errors += `${err.name}: ${err.message}\n`;
  }

  return errors;
}

// Authentication routes

var authRoutes = express.Router();

authRoutes.post('/signup', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please enter both email and password'});
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password,
      // Optional
      role: req.body.role,
      track: req.body.track,
      startingYear: req.body.startingYear,
      nickname: req.body.nickname,
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        console.log(err);
        var errors = errorParser(err);
        return res.json({
          success: false,
          message: `Something went wrong. Hopefully helpful description:\n${errors}`,
        });
      }
      res.json({success: true, msg: 'Successfully created new user'});
    });
  }
});

authRoutes.post('/authenticate', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. Email not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({
            success: true,
            token: 'JWT ' + token,
            profile: {
              id: user._id,
              email: user.email,
              role: user.role,
              track: user.track,
              startingYear: user.startingYear,
              nickname: user.nickname,
              favorites: user.favorites
            },
          });
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

// Helper function for routes that require authorization
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

app.use('/auth', authRoutes);

// User routes

app.get('/user', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({
            success: true,
            email: user.email,
            role: user.role,
            track: user.track,
            startingYear: user.startingYear,
            nickname: user.nickname,
            favorites: user.favorites
          });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided'});
  }
});

app.put('/user', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          _.each(req.body, function (value, key) {
            if (value) {
              user[key] = value;
            }
          });
          user.save(function (err, updatedUser) {
            if (err) {
              console.log(err);
              var errors = errorParser(err);

              return res.json({
                success: false,
                message: `Something went wrong. Hopefully helpful description:\n${errors}`,
              });
            }
            res.status(200).send({success: true, msg: `Success! ${user}`});
          });
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided'});
  }
});

// Course routes

app.post('/course', function (req, res) {
  if (!req.body.name || !req.body.code) {
    res.json({
      success: false,
      message: 'Please enter course name and code.'
    });
  } else {
    var newCourse = new Course({
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
    newCourse.save(function(err) {
      if (err) {
        console.log(err);
        var errors = errorParser(err);

        return res.json({
          success: false,
          message: `Something went wrong. Hopefully helpful description:\n${errors}`,
        });
      }
      res.json({
        success: true,
        message: `Successfully added new course ${req.body.code} - ${req.body.name}`,
      });
    });
  }
});

// Get a single course
app.get('/course/:code', function (req, res) {
  var code = req.params.code;
  Course.findOne({
    code // Same as { code: code }
  }, function(err, course) {
      if (err) throw err;
      if (!course) {
        return res.status(404).send({
          success: false,
          message: 'Course not found'
        });
      } else {
        res.json({ success: true, course });
      }
  });
});

// Search courses
app.get('/search/:keyword', function (req, res) {
  var keyword = req.params.keyword;
  var regexp = new RegExp(keyword, 'i');
  // TODO what if user writes "CS-E4400 Web Services"? This will return []
  Course.find({
    $or: [
      { name: regexp },
      { code: regexp }
    ]
  })
  .limit(10)
  .select('code name credits')
  .lean()
  .exec(function(err, courses) {
      if (err) throw err;
      if (!courses.length) {
        // We don't want to spam the console with 403, so send 200
        return res.status(200).send({
          success: false,
          message: 'Courses not found'
        });
      } else {
        res.json({ success: true, courses });
      }
  });
});

// Review routes

app.post('/review', function (req, res) {
  if (!req.body.score || !req.body.workload) {
    res.json({
      success: false,
      message: 'Please enter both workload and score'
    });
  } else if (!req.body.courseCode || !req.body.userID) {
      res.json({
        success: false,
        message: 'Course or User ID not given'
      });
  } else {
    var newReview = new Review({
      score: req.body.score,
      workload: req.body.workload,
      courseCode: req.body.courseCode,
      userID: mongoose.Types.ObjectId(req.body.userID),
    });

    newReview.save(function(err) {
      if (err) {
        console.log(err);
        var errors = errorParser(err);

        return res.json({
          success: false,
          message: `Something went wrong. Hopefully helpful description:\n${errors}`,
        });
      }
      // Add Review to Course
      Course.findOne({
        code: req.body.courseCode
      }, function(err, course) {
        if (err) throw err;
        if (!course) {
          return res.status(404).send({
            success: false,
            message: 'Course not found when adding review'
          });
        }
        course.reviews.push(newReview._id);
        // TODO HACK Just hope this doesn't throw an error
        // Perhaps some day add some transaction logic here
        course.save();
      });

      res.json({
        success: true,
        message: `Successfully added new review`,
      });
    });
  }
});

// Get Review by ObjectId (Course has a list of IDs)
app.get('/review/:id', function (req, res) {
  var id = mongoose.Types.ObjectId(req.params.id);
  Review.findById(id, function(err, review) {
      if (err) throw err;
      if (!review) {
        return res.status(404).send({
          success: false,
          message: 'Review not found'
        });
      } else {
        res.json({ success: true, review });
      }
  });
});

// Comment routes

// TODO

app.get('/', function (req, res) {
  res.json({ message: 'Hello World!' });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});
