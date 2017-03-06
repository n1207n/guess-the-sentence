'use strict';

import {Room} from '../../models';

import {checkUndefinedFields} from '../../utils';

import {authenticateByJWT} from '../../auth';

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
      grabRoom)
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

async function grabRoom(ctx, next) {
  const room = await Room.findOne({_id: ctx.params.room_id}).exec();

  if (room === null) {
    ctx.status = 404;
    ctx.body = {message: "No room found"};
  } else {
    ctx.state.room = room;
    return next();
  }
};

async function checkCreator(ctx, next) {
  const {user, room} = ctx.state;

  if (room.creator._id !== user._id) {
    ctx.status = 403;
    ctx.body = {message: "You are not a room creator"};
  } else {
    return next();
  }
};

async function getRoomList(ctx) {
  const rooms = await Room.find().limit(20).exec();
  let data = [];

  if (rooms !== null) {
    data = rooms;
  }

  ctx.status = 200;
  ctx.body = {data};
};

async function createRoom(ctx) {
  if (checkUndefinedFields(ctx.request.body, ["name", ])) {
    ctx.status = 400;
    ctx.body = {message: "name fields are required to create a room."};
  } else {
    const {name} = ctx.request.body;

    const room = new Room(name, creator: ctx.state.user);
    const result = await room.save();

    if (result !== null) {
      ctx.status = 200;
      ctx.body = {room};
    } else {
      ctx.status = 400;
      ctx.body = {status: 'error', message: "Failed to create a room. Pleas try again."};
    }
  }
};

async function updateRoom(ctx) {
  let room = ctx.state.room;

  room.name = name || room.name;
  room.creator = creator || room.creator;
  room.attendees = attendees || room.attendees;
  room.timer = timer || room.timer;
  room.answer = answer || room.answer;

  const result = await room.save();

  if (result !== undefined) {
    ctx.status = 200;
    ctx.body = {room};
  } else {
    ctx.status = 400;
    ctx.body = {status: 'error', message: "Failed to update a room. Pleas try again."};
  }
};

async function deleteRoom(ctx) {
  const {room} = ctx.state;
  const result = await room.remove();

  if (result !== null) {
    ctx.status = 204;
    ctx.body = {};
  } else {
    ctx.status = 400;
    ctx.body = {status: 'error', message: "Failed to delete a room. Pleas try again."};
  }
};
