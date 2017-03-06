'use strict';

import {hasNoUndefinedFields} from '../../utils';

import {authenticateByJWT} from '../../auth';

/**
 * User middleware that mutates incoming router object to add routes
 * @param  {koa-router Router} router
 */
export default (router) => {
  router.get('userProfile', '/user/profile',
    authenticateByJWT(), getUserData);

  router.patch('userProfileUpdate', '/user/profile',
    authenticateByJWT(), updateUserData);
};

/**
 * A middleware to return a current User object
 * @param  {koa.Context}   ctx
 * @return {Promise}
 */
async function getUserData(ctx) {
  ctx.status = 200;
  ctx.body = ctx.state.user;
};

/**
 * A middleware to update a current User object
 * @param  {koa.Context}   ctx
 * @return {Promise}
 */
async function updateUserData(ctx) {
  const {name, email, password} = ctx.request.body;

  if (hasNoUndefinedFields(ctx.request.body, ["name", "email", "password"]) === false) {
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
      ctx.body = {message: "Failed to update user. Please try again."};
    }
  } else {
    ctx.status = 400;
    ctx.body = {message: "Only name, email, and password are editable."};
  }
};
