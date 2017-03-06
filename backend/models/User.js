'use strict';

import mongoose from 'mongoose';

/**
 * A Mongoose schema for User document with timestamps
 * @type {mongoose Schema}
 */
export const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    index: true,
  },

  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },

  collection: 'User',
});

export const User = mongoose.model('User', UserSchema, 'User');
