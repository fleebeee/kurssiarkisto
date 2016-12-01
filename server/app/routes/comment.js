import express from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
import errorParser from '../utils/errorParser';
// import getToken from '../utils/getToken';

import Comment from '../models/comment';
import User from '../models/user';

const commentRoutes = express.Router();

// TODO require authentication AND verify userID
commentRoutes.post('/comment', (req, res) => {
  if (!req.body.content) {
    res.json({
      success: false,
      message: 'Please enter comment content!',
    });
  } else {
    const newComment = new Comment({
      userID: mongoose.Types.ObjectId(req.body.userID),
      courseCode: req.body.code,
      content: req.body.content,
    });
    // save the comment
    newComment.save((err) => {
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
          `Successfully added new comment for course ${req.body.code}`,
      });
    });
  }
});

const clearVoterID = (comment, userID) => {
  comment.upvoters.pull(userID);
  comment.downvoters.pull(userID);
};

// Vote actions TODO verify etc
commentRoutes.put('/comment', (req, res) => {
  if (!req.body.userID || !req.body.commentID) {
    return res.json({
      success: false,
      message: 'Please enter both userID and commentID',
    });
  }

  if (!(req.body.vote === '-1'
     || req.body.vote === '0'
     || req.body.vote === '1')) {
    return res.json({
      success: false,
      message: 'Please enter vote',
    });
  }

  Comment.findOne({
    _id: mongoose.Types.ObjectId(req.body.commentID),
  }, (err, comment) => {
    if (err) throw err;
    if (!comment) {
      return res.status(404).send({
        success: false,
        message: 'Comment not found',
      });
    }

    clearVoterID(comment, req.body.userID);

    if (req.body.vote === '1') {
      comment.upvoters.push(req.body.userID);
      comment.save();
      return res.json({
        success: true,
        message:
          'Upvoted comment',
      });
    } else if (req.body.vote === '-1') {
      comment.downvoters.push(req.body.userID);
      comment.save();
      return res.json({
        success: true,
        message:
          'Downvoted comment',
      });
    }

    comment.save();
    return res.json({
      success: true,
      message:
        'Removed vote',
    });
  });
  return res.json({
    success: false,
    message:
      'Something went wrong',
  });
});

// Get comments for a course
commentRoutes.get('/comments/:code', (req, res) => {
  const code = req.params.code;
  Comment.find({
    courseCode: code,
  }, (err, comments) => {
    if (err) throw err;
    if (!comments) {
      return res.status(404).send({
        success: false,
        message: 'Comments not found',
      });
    }

    // Find nicknames for users
    User.find({
      _id: { $in: comments.map(
        comment => mongoose.Types.ObjectId(comment.userID)),
      },
    }, (err2, users) => {
      if (err2) throw err2;

      const memoized = {};
      // Just ES6 things Kappa
      const mutableComments = comments.map(comment => comment.toObject());
      mutableComments.forEach((comment) => {
        // Use strings as the object keys instead of Mongoose objects
        const userIDstring = comment.userID.toString();

        if (_.has(memoized, userIDstring)) {
          comment.nickname = memoized[userIDstring];
        } else {
          let user = _.find(users, u => u._id.equals(comment.userID));
          if (user) {
            user = user.toObject();
          }

          const nickname = _.has(user, 'nickname') ? user.nickname : 'Unknown';

          memoized[userIDstring] = nickname;
          comment.nickname = nickname;
        }

        // Calculate score
        comment.score = comment.upvoters.length - comment.downvoters.length;
        // Up and downvoters are not public information, so delete them
        delete comment.upvoters;
        delete comment.downvoters;
      });

      return res.json({ success: true, comments: mutableComments });
    });

    return true;
  });
});

module.exports = commentRoutes;
