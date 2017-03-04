'use strict';

import mongoose from 'mongoose';

import {User} from '../models';

/**
 * A Mongoose schema for Chat document with timestamps
 * @type {mongoose Schema}
 */
const ChatSchema = mongoose.Schema({
  user: {
    type: User,
    required: true,
  }

  message: {
    type: String,
    required: true,
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },

  collection: 'Chat',
});

export default mongoose.model('Chat', ChatSchema, 'Chat');
