var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-type-email');
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
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
  }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
