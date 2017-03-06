'use strict';

import {User} from '../../models';

import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';

// Parsing JWT value from Authorization header
// JWT secret key for encrypting/decrypting from environment variable
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SECRET,
};

export default new JWTStrategy(options, async (payload, done) => {
  /**
   * done callback parameters
   * - JS error object or null
   * - data or false boolean value
   * - message string or null
   */
  try {
    const user = await User.findById(payload.id).exec();

    if (user === null) {
      done(null, false, "Incorrect user ID");
    } else {
      done(null, user, "OK");
    }
  } catch (e) {
    done(e);
  }
});
