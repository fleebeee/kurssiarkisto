var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors')
var mongoose = require('mongoose');
var passport = require('passport');
var port = process.env.PORT || 3003;
var jwt = require('jwt-simple');

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

mongoose.Promise = require('bluebird');
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

// Authentication routes

var authRoutes = express.Router();

authRoutes.post('/signup', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please enter both email and password'});
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        console.log(err);
        return res.json({success: false, msg: 'Email already exists'});
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
              data: 'placeholder',
            },
          });
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

// TODO Move out of authRoutes
authRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false }), function(req, res) {
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
          res.json({success: true, msg: 'Welcome in the member area ' + user.email + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided'});
  }
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
        return res.json({
          success: false,
          message: 'Something went wrong. Course code might be used.',
        });
      }
      res.json({
        success: true,
        message: `Successfully added new course ${req.body.code} - ${req.body.name}`,
      });
    });
  }
});

app.get('/course/:code', function (req, res) {
  var code = req.params.code;
  Course.findOne({
    code // Same as { code: code }
  }, function(err, course) {
      if (err) throw err;
      if (!course) {
        return res.status(403).send({
          success: false,
          message: 'Course not found'
        });
      } else {
        res.json({ success: true, course });
      }
  });
});

// TODO Keyword search or something similar

// Review routes

// TODO

// Comment routes

// TODO

app.get('/', function (req, res) {
  res.json({ message: 'Hello World!' });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});
