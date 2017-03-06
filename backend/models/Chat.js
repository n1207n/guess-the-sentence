'use strict';

import mongoose from 'mongoose';

import {UserSchema} from '../models';

/**
 * A Mongoose schema for Chat document with timestamps
 * @type {mongoose Schema}
 */
export const ChatSchema = mongoose.Schema({
  user: {
    type: UserSchema,
    required: true,
  },

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

export const Chat = mongoose.model('Chat', ChatSchema, 'Chat');
