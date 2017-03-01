// @flow
'use strict';

import mongoose from 'mongoose';

/**
 * A JS function which returns Promise to handle MongoDB connection
 * @param  {String} uri  A full MongoDB URI
 * @return {Promise}     A JS Promise which returns a connection info Object
 *                       or throws an exception
 */
export function connectDB(uri: String) {
  return new Promise(function(resolve: Function, reject: Function) {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('DB connection is closed'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(uri);
  });
}
