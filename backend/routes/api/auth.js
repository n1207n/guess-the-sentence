'use strict';

import {User} from '../../models';

import {generateToken, authenticate} from '../../auth';

/**
 * Auth middleware that mutates incoming router object to add routes
 * @param  {koa-router Router} router
 */
export default (router) => {
  router.post('userRegister', '/auth/register',
    register, generateToken());

  router.post('userSignIn', '/auth/signin',
    authenticate(), generateToken());
}

/**
 * A middleware to create a new User object
 * @param  {koa.Context}   ctx
 * @param  {Function}      next
 * @return {Promise}
 */
async function register(ctx, next) {
  const {name, email, password} = ctx.request.body;

  if (name != undefined && email != undefined && password != undefined) {
    let user = await User.findOne({email}).exec();

    if (user === null) {
      user = new User({name, email, password});
      user.save();

      await ctx.login(user);
      await next();
    } else {
      ctx.status = 400;
      ctx.body = {message: "This e-mail is already registered."};
    }
  } else {
    ctx.status = 400;
    ctx.body = {message: "name, email, and password are required in valid format."};
  }
}
