'use strict';

import mongoose from 'mongoose-fill';

/**
 * A Mongoose schema for User document with timestamps
 * @type {mongoose Schema}
 */
const UserSchema = new mongoose.Schema({
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
  }
});

export default mongoose.model('User', UserSchema);
