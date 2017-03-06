'use strict';

import mongoose from 'mongoose';

/**
 * A Mongoose schema for Room document with timestamps
 * @type {mongoose Schema}
 */
export const RoomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  attendees: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    required: false,
  },

  timer: {
    type: Number,
    required: false,
  },

  answer: {
    type: String,
    required: false,
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
});

export const Room = mongoose.model('Room', RoomSchema, 'Room');
