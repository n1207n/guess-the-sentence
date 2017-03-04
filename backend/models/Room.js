'use strict';

import mongoose from 'mongoose';

import {User} from '../models';

/**
 * A Mongoose schema for Room document with timestamps
 * @type {mongoose Schema}
 */
const RoomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  creator: {
    type: User,
    required: true,
  }

  attendees: {
    type: [User],
    required: false,
  },

  timer: {
    type: Number,
    required: true,
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

export default mongoose.model('Room', RoomSchema);
