import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  courseCode: {
    type: String,
    required: true,
  },

  timestamp: { // timestamp of the comment in UTC milliseconds
    type: Date,
    required: true,
  },

  content: { // comment content
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('Comment', CommentSchema);
