'use strict';

import Koa from 'koa';

// Load the app configuration
import './config';

import {connectDB} from './db';
import middlewares from './middlewares';

const app = new Koa();

// Load the composed middlewares
app.use(middlewares());

// Start the Koa app server with MongoDB connection
(async() => {
  // It would try to open MongoDB connection first
  try {
    const dbURI = process.env.MONGODB_URI;
    const dbConnectionInfo = await connectDB(dbURI);

    console.log(`Connected to ${dbConnectionInfo.host}:${dbConnectionInfo.port}/${dbConnectionInfo.name}`);
  } catch (e) {
    console.error('Unable to connect to MongoDB');
  }

  // Serve the app!!
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application started on port ${port}`);
})();
