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
  content: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  upvoters: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
  downvoters: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


module.exports = mongoose.model('Comment', CommentSchema);
