'use strict';

import {User} from '../../models';

import {generateToken} from '../../auth';

export default (router) => {
  router.post('userRegister', '/auth/register',
    register, generateToken());
}

async function register(ctx, next) {
  const {name, email, password} = ctx.request.body;

  if (name != undefined && email != undefined && password != undefined) {
    let user = await User.findOne({email}).exec();

    if (user === null) {
      user = new User({name, email, password});
      user.save();

      ctx.passport = {user: user._id};

      return next();
    } else {
      ctx.status = 400;
      ctx.body = {status: 'error', message: "This e-mail is already registered."};
    }
  } else {
    ctx.status = 400;
    ctx.body = {status: 'error', message: "name, email, and password are required in valid format."};
  }
}
