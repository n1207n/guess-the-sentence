'use strict';

import User from '../../models/User';

async function register(ctx, next) {
  const {name, email, password} = ctx.request.body;

  if (name != undefined && email != undefined && password != undefined) {
    let user = await User.findOne({email});

    if (user !== undefined) {
      user = new User({
        name,
        email
      });

      await user.save();

      ctx.status = 201;
      ctx.body = {user};

    } else {
      ctx.status = 400;
      ctx.body = {status: 'error', message: "This e-mail is already registered."};
    }
  } else {
    ctx.status = 400;
    ctx.body = {status: 'error', message: "name, email, and password are required in valid format."};
  }

  await next();
}

export default (router) => {
  router.post('userRegister', '/auth/register', register);
}
