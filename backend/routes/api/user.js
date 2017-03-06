'use strict';

import {authenticateByJWT} from '../../auth';

export default (router) => {
  router.get('userProfile', '/user/profile',
    authenticateByJWT(), getUserData);

  router.patch('userProfileUpdate', '/user/profile',
    authenticateByJWT(), updateUserData);
};

async function getUserData(ctx) {
  ctx.status = 200;
  ctx.body = ctx.state.user;
};

async function updateUserData(ctx) {
  const {name, email, password} = ctx.request.body;

  if (name != undefined || email != undefined || password != undefined) {
    let user = ctx.state.user;

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    const result = await user.save();

    if (result !== null) {
      ctx.status = 200;
      ctx.body = ctx.state.user;
    } else {
      ctx.status = 400;
      ctx.body = {status: 'error', message: "Failed to update user. Please try again."};
    }
  } else {
    ctx.status = 400;
    ctx.body = {status: 'error', message: "Only name, email, and password are editable."};
  }
};
