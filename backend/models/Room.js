'use strict';

import mongoose from 'mongoose';

import {UserSchema} from '../models';

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
    type: UserSchema,
    required: true,
  },

  attendees: {
    type: [UserSchema],
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

export const Room = mongoose.model('Room', RoomSchema);
