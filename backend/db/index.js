'use strict';

import mongoose from 'mongoose';

export function connectDB(uri) {
  return new Promise(function(resolve, reject) {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('DB connection is closed'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(uri);
  });
}
