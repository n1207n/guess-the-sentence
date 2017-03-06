'use strict';

import {Room} from '../../models';

import {hasNoUndefinedFields} from '../../utils';

import {authenticateByJWT} from '../../auth';

/**
 * Room middleware that mutates incoming router object to add routes
 * @param  {koa-router Router} router
 */
export default (router) => {
  router
    .get(
      'roomList', '/room',
      authenticateByJWT(),
      getRoomList)
    .post(
      'roomList', '/room',
      authenticateByJWT(),
      createRoom)
    .get('roomDetail', '/room/:room_id',
      authenticateByJWT(),
      grabRoom,
      getRoomDetail)
    .patch('roomUpdate', '/room/:room_id',
      authenticateByJWT(),
      grabRoom,
      checkCreator,
      updateRoom)
    .delete('roomDelete', '/room/:room_id',
      authenticateByJWT(),
      grabRoom,
      checkCreator,
      deleteRoom);
};

/**
 * A middleware to get a Room object from url parameter room_id
 * @param  {koa.Context}   ctx
 * @param  {Function}      next
 * @return {Promise}
 */
async function grabRoom(ctx, next) {
  // Query a Room object without creator's password field
  const room = await Room.findById(ctx.params.room_id)
    .populate("creator", "-password").exec();

  if (room === null) {
    ctx.status = 404;
    ctx.body = {message: "No room found"};
  } else {
    ctx.state.room = room;
    return next();
  }
};

/**
 * A middleware to check a queried Room object's creator against current User
 * @param  {koa.Context}   ctx
 * @param  {Function}      next
 * @return {Promise}
 */
async function checkCreator(ctx, next) {
  const {user, room} = ctx.state;

  if (room.creator.id !== user.id) {
    ctx.status = 403;
    ctx.body = {message: "You are not a room creator"};
  } else {
    return next();
  }
};

/**
 * A middleware to get Room objects of 20 or
 * a GET parameter value `limit`
 * @param  {koa.Context}   ctx
 * @return {Promise}
 */
async function getRoomList(ctx) {
  // Determine the # of objects to get
  const limit = Number(ctx.query.limit) || 20;

  const rooms = await Room.find().limit(limit).exec();
  let data = [];

  if (rooms !== null) {
    data = rooms;
  }

  ctx.status = 200;
  ctx.body = {data};
};

/**
 * A middleware to get one Room object for its ID
 * @param  {koa.Context}   ctx
 * @return {Promise}
 */
async function getRoomDetail(ctx) {
  const {room} = ctx.state;

  ctx.status = 200;
  ctx.body = room;
}

/**
 * A middleware to create a new Room object
 * @param  {koa.Context}   ctx
 * @return {Promise}
 */
async function createRoom(ctx) {
  // Check for required fields (e.g `name`) from parsed request body
  if (hasNoUndefinedFields(ctx.request.body, ["name", ]) === false) {
    ctx.status = 400;
    ctx.body = {message: "name fields are required to create a room."};
  } else {
    const {name} = ctx.request.body;
    const roomLookup = await Room.findOne({name}).exec();

    // If there is no existing room
    if (roomLookup === null) {
      const room = new Room({name, creator: ctx.state.user});
      const result = await room.save();

      // Successful save
      if (result !== null) {
        const resultObject = result.toObject();

        // Hide the password from its plain JS object ;)
        delete resultObject.creator.password;

        ctx.status = 200;
        ctx.body = {resultObject};
      } else {
        ctx.status = 400;
        ctx.body = {status: 'error', message: "Failed to create a room. Pleas try again."};
      }
    } else {
      ctx.status = 400;
      ctx.body = {status: 'error', message: "The room already exists."};
    }
  }
};

/**
 * A middleware to update a Room object
 * @param  {koa.Context}   ctx
 * @return {Promise}
 */
async function updateRoom(ctx) {
  const {name, creator, attendees, timer, answer} = ctx.request.body;
  let room = ctx.state.room;

  room.name = name || room.name;
  room.creator = creator || room.creator;
  room.attendees = attendees || room.attendees;
  room.timer = timer || room.timer;
  room.answer = answer || room.answer;

  const result = await room.save();

  // Successful save
  if (result !== null) {
    ctx.status = 200;
    ctx.body = {room};
  } else {
    ctx.status = 400;
    ctx.body = {status: 'error', message: "Failed to update a room. Pleas try again."};
  }
};

/**
 * A middleware to delete a Room object
 * @param  {koa.Context}   ctx
 * @return {Promise}
 */
async function deleteRoom(ctx) {
  const {room} = ctx.state;
  const result = await room.remove();

  // Successful save
  if (result !== null) {
    ctx.status = 204;
    ctx.body = {};
  } else {
    ctx.status = 400;
    ctx.body = {status: 'error', message: "Failed to delete a room. Pleas try again."};
  }
};
