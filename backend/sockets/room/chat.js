'use strict';

import IO from 'koa-socket';
import {authorize} from 'koa-socket-passport';

import sessionMiddleware from '../../middlewares/session';

import {User, Chat, Room} from '../../models';

/**
 * Chat socket middleware that attaches a new socket for Koa app
 * @param  {koa Koa} app
 */
export default (app) => {
  const io = new IO('sockets');
  io.attach(app);

  io.use(authorize({
    key: 'koa.sid',
    secret: app.keys,
    store: sessionMiddleware,
  }));
  
  io.on('connection', handleConnect);
  io.on('disconnect', handleDisconnect);
  io.on('numOfPeople', handleNumOfPeople);
  io.on('message', handleMessage);
  io.on('answered', handleAnswered);
  io.on('timeout', handleTimeout);
  io.on('newRound', handleNewRound);
  io.on('roomClosed', handleRoomClosed);
}

/**
 * A socket middleware to broadcast a new user joined
 * @param  {koa.Context}   ctx
 * @return {Promise}
 */
function handleConnect(ctx) {
  console.log("HI Connect");
  console.log(ctx);
  ctx.socket.emit('OK');
};

function handleDisconnect(ctx) {
  console.log("HI");
  console.log(ctx.data);
};

function handleNumOfPeople(ctx) {
  console.log("HI");
  console.log(ctx);
  console.log(ctx.data);
  ctx.socket.emit('OK');
};

function handleMessage(ctx) {
  console.log("HI");
  console.log(ctx.data);
};

function handleAnswered(ctx) {
  console.log("HI");
  console.log(ctx.data);
};

function handleTimeout(ctx) {
  console.log("HI");
  console.log(ctx.data);
};

function handleNewRound(ctx) {
  console.log("HI");
  console.log(ctx.data);
};

function handleRoomClosed(ctx) {
  console.log("HI");
  console.log(ctx.data);
};
