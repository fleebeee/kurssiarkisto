import jwt from 'jwt-simple';

import User from '../models/user';
import config from '../../config/database';

const getUser = async (token) => {
  if (token) {
    let decoded = null;

    try {
      decoded = jwt.decode(token, config.secret);
    } catch (err) {
      // Probably incorrect credentials, but log it anyway
      console.log(err);
      return false;
    }

    const user = await User.findOne({
      name: decoded.name,
    });
    return user;
  }
  return false;
};

module.exports = getUser;
