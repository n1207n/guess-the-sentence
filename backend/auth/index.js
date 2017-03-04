'use strict';

import importDir from 'import-dir';
import jwt from 'jsonwebtoken';

import passport from 'koa-passport';
import jwtStrategy from './strategies/jwt';

import {User} from '../models';

passport.use('jwt', jwtStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  (async () => {
    try {
      const user = User.findById(id).exec();

      done(null, user);
    } catch (error) {
      done(error);
    }
  })();
})

export default function auth(app) {
  app.use(passport.initialize());
  app.use(passport.session());
}

export function authenticateByJWT() {
  return passport.authenticate('jwt');
}

export function generateToken() {
  return async ctx => {
    const {user} = ctx.passport;

    if (user === false || user === undefined) {
      ctx.status = 401;
    } else {
      const jwtToken = `JWT ${jwt.sign({id: user._id}, process.env.JWT_SECRET)}`;

      ctx.status = 200;
      ctx.body = {
        jwtToken,
        user
      };
    }
  };
}
