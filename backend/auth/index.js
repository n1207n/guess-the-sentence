'use strict';

import importDir from 'import-dir';
import jwt from 'jsonwebtoken';

import passport from 'koa-passport';
import jwtStrategy from './strategies/jwt';
import localStrategy from './strategies/local';

import {User} from '../models';

passport.use('jwt', jwtStrategy);
passport.use('local', localStrategy);

passport.serializeUser((user, done) => {
  (async () => {
    try {
      done(null, user._id);
    } catch (error) {
      done(error);
    }
  })();
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
  return async (ctx, next) => {
    await passport.authenticate('jwt', async (err, user, infoMessage) => {
      if (user === false) {
        ctx.status = 401;
        ctx.body = {message: infoMessage};
      } else {
        await ctx.login(user);
        return next();
      }
    })(ctx, next);
  };
}

export function authenticate() {
  return async (ctx, next) => {
    await passport.authenticate('local', async (err, user, infoMessage) => {
      if (user === false) {
        ctx.status = 401;
        ctx.body = {message: infoMessage};
      } else {
        await ctx.login(user);
        return next();
      }
    })(ctx, next);
  };
}

export function checkAuth() {
  return async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      return next();
    } else {
      ctx.status = 401;
      ctx.body = {message: "Authentication is required."};
    }
  }
}

export function generateToken() {
  return async ctx => {
    const {user} = ctx.state;

    if (user === undefined) {
      ctx.status = 400;
      ctx.body = {"message": "Failed to generate token. Please try again."};
    } else {
      const jwtToken = `JWT ${jwt.sign({id: user.id}, process.env.JWT_SECRET)}`;

      const userObject = ctx.state.user.toObject();

      // Hide the password ;)
      delete userObject.password;

      ctx.status = 200;
      ctx.body = {
        jwtToken,
        userObject
      };
    }
  };
}
