import express from 'express';
import jwt from 'jwt-simple';
import errorParser from '../utils/errorParser';
// import getToken from '../utils/getToken';

import config from '../../config/database';
import User from '../models/user';

const authRoutes = express.Router();

authRoutes.post('/signup', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, msg: 'Please enter both email and password' });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      // Optional
      role: req.body.role,
      track: req.body.track,
      startingYear: req.body.startingYear,
      nickname: req.body.nickname,
    });
    // save the user
    newUser.save((err) => {
      if (err) {
        console.log(err);
        const errors = errorParser(err);
        return res.json({
          success: false,
          message:
            `Something went wrong. Hopefully helpful description:\n${errors}`,
        });
      }
      return res.json({ success: true, msg: 'Successfully created new user' });
    });
  }
});

authRoutes.post('/authenticate', (req, res) => {
  User.findOne({
    email: req.body.email,
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.send({
        success: false,
        msg: 'Authentication failed. Email not found.',
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, (err2, isMatch) => {
        if (isMatch && !err2) {
          // if user is found and password is right create a token
          const token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({
            success: true,
            token: `JWT ${token}`,
            profile: {
              id: user._id,
              email: user.email,
              role: user.role,
              track: user.track,
              startingYear: user.startingYear,
              nickname: user.nickname,
              favorites: user.favorites,
            },
          });
        } else {
          res.send({
            success: false,
            msg: 'Authentication failed. Wrong password.',
          });
        }
      });
    }
  });
});

module.exports = authRoutes;
