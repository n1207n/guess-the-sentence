'use strict';

import {User} from '../../models';

import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SECRET,
};

export default new JWTStrategy(options, async (payload, done) => {
  const user = await User.findById(payload.id).exec();

  if (user === null) {
    done(null, false, {message: "Incorrect user ID"});
  } else {
    done(null, user, {message: "OK"});
  }
});
