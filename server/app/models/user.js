import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
require('mongoose-type-email');

const UserSchema = new Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  track: {
    type: String,
    required: false,
  },
  startingYear: {
    type: Number,
    required: false,
  },
  nickname: {
    type: String,
    required: false,
  },
  favorites: {
    type: [Schema.Types.Objectid],
    required: false,
  },
});

UserSchema.pre('save', function s(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err2, hash) => {
        if (err2) {
          return next(err2);
        }
        user.password = hash;
        return next();
      });
      return true;
    });
  } else {
    return next();
  }
  return true;
});

// Since this can't be bound to anything else in arrow functions,
// they can't be used with the new keyword, since that needs to bind
// this to a new object.
UserSchema.methods.comparePassword = function cp(passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
