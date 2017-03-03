'use strict';

import asyncBusboy from 'async-busboy';

import User from '../../models/User';

export default (router) => {
  router.post('userRegister', '/auth/register', register);
}

async function register(ctx, next) {
  const {files, fields} = await asyncBusboy(ctx.req);

  const {name, email, password} = fields;

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
}
