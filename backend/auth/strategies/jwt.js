'use strict';

import {User} from '../../models';

import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SECRET,
};

export default new JWTStrategy(options, async (payload, done) => {
  const user = await User.findById(payload.id);

  if (user === null) {
    done(null, false);
  } else {
    done(null, user);
  }
});
