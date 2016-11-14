import express from 'express';
import passport from 'passport';
import jwt from 'jwt-simple';
import _ from 'lodash';
import errorParser from '../utils/errorParser';
import getToken from '../utils/getToken';

import User from '../models/user';
import config from '../../config/database';

const userRoutes = express.Router();

userRoutes.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      const decoded = jwt.decode(token, config.secret);
      User.findOne({
        email: decoded.email,
      }, (err, user) => {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({
            success: false,
            msg: 'Authentication failed. User not found.',
          });
        }
        return res.json({
          success: true,
          email: user.email,
          role: user.role,
          track: user.track,
          startingYear: user.startingYear,
          nickname: user.nickname,
          favorites: user.favorites,
        });
      });
    }
    return res.status(403).send({
      success: false, msg: 'No token provided',
    });
  },
);

userRoutes.put(
  '/user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      const decoded = jwt.decode(token, config.secret);
      User.findOne({
        email: decoded.email,
      }, (err, user) => {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({
            success: false,
            msg: 'Authentication failed. User not found.',
          });
        }
        _.each(req.body, (value, key) => {
          if (value) {
            user[key] = value;
          }
        });

        user.save((err2 /* , updatedUser */) => {
          if (err2) {
            console.log(err2);
            const errors = errorParser(err2);

            return res.json({
              success: false,
              message:
              `Something went wrong. Hopefully helpful description:\n${errors}`,
            });
          }
          return res.status(200).send({ success: true, msg: 'Success!' });
        });
        return true;
      });
    } else {
      return res.status(403).send({
        success: false,
        msg: 'No token provided',
      });
    }
    return true;
  },
);

module.exports = userRoutes;
