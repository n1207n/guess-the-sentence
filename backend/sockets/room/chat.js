'use strict';

import IO from 'koa-socket';
// import {authorize} from 'koa-socket-passport';

import sessionMiddleware from '../../middlewares/session';

import {User, Chat, Room} from '../../models';

/**
 * Chat socket middleware that attaches a new socket for Koa app
 * @param  {koa Koa} app
 */
export default (app) => {
  const io = new IO('sockets');
  io.attach(app);

  // io.use(authorize({
  //   key: 'koa.sid',
  //   secret: app.keys,
  //   store: sessionMiddleware,
  //   success: function onAuthorizeSuccess(ksp) {
  //     var user = ksp.user;
  //     var session = ksp.session;
  //
  //     session.authenticted_users_count = session.authenticted_users_count || 0;
  //     session.authenticted_users_count++;
  //   },
  //   fail: function onAuthorizeFail(err, ksp) {
  //     if (err.critical) {
  //       throw Error('Socket Authorization Failed. ', err.critical, err);
  //     }
  //   }
  // }));

  io.on('connection', handleConnect);
  io.on('disconnect', handleDisconnect);
  io.on('joinRoom', handleJoinRoom);
  // io.on('leaveRoom', handleLeaveRoom);
  // io.on('numOfPeople', handleNumOfPeople);
  // io.on('message', handleMessage);
  // io.on('answered', handleAnswered);
  // io.on('timeout', handleTimeout);
  // io.on('newRound', handleNewRound);
  // io.on('roomClosed', handleRoomClosed);
}

/**
 * A socket middleware for new socket connection
 * @param  {koa.Context}   ctx
 * @return {Promise}
 */
function handleConnect(ctx) {
  console.log("New socket connection");
  ctx.socket.emit('OK');
};

/**
 * A socket middleware for disconnecting socket connection
 * @param  {koa.Context}   ctx
 * @return {Promise}
 */
function handleDisconnect(ctx) {
  console.log("Socket disconnected");
  ctx.socket.emit('OK');
};

/**
 * A socket middleware for joining a room
 * @param  {koa.Context}   ctx
 * @return {Promise}
 */
async function handleJoinRoom(ctx) {
  if (ctx.data.room_id === undefined) {
    ctx.socket.emit('Fail: room_id is required');
  } else {
    if (ctx.user) {
      // Query a Room object without creator's password field
      const room = await Room.findById(ctx.params.room_id)
        .populate("creator", "-password").exec();

      if (room === null) {
        ctx.socket.emit('Fail: The room does not exist.');
      } else {
        room.attendees.push(ctx.user);
        const result = await room.save();

        // Successful save
        if (result !== null) {
          console.log(`User ${socket.user.id} has joined`);
          ctx.socket.emit('OK');
        } else {
          console.log(`User ${socket.user.id} failed to join Room ${room.id}`);
          ctx.socket.emit('Fail: Couldn\'t join the room. Please try again.');
        }
      }
    } else {
      ctx.socket.emit('Fail: You are not authenticated to join.');
    }
  }
};

// /**
//  * A socket middleware for leaving a room
//  * @param  {koa.Context}   ctx
//  * @return {Promise}
//  */
// function handleLeaveRoom(ctx) {
//   console.log("Socket disconnected");
// };
//
// function handleNumOfPeople(ctx) {
//   console.log("HI");
//   console.log(ctx);
//   console.log(ctx.data);
//   ctx.socket.emit('OK');
// };
//
// function handleMessage(ctx) {
//   console.log("HI");
//   console.log(ctx.data);
// };
//
// function handleAnswered(ctx) {
//   console.log("HI");
//   console.log(ctx.data);
// };
//
// function handleTimeout(ctx) {
//   console.log("HI");
//   console.log(ctx.data);
// };
//
// function handleNewRound(ctx) {
//   console.log("HI");
//   console.log(ctx.data);
// };
//
// function handleRoomClosed(ctx) {
//   console.log("HI");
//   console.log(ctx.data);
// };
