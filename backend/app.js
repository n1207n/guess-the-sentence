'use strict';

import Koa from 'koa';

// Load the app configuration
import './config';

import {connectDB} from './db';
import middlewares from './middlewares';
import routes from './routes';

const app = new Koa();

// Load the composed middlewares
middlewares(app);
console.log('Loaded middlewares');

routes(app);
console.log('Loaded routes');

// Start the Koa app server with MongoDB connection
(async() => {
  // It would try to open MongoDB connection first
  try {
    const dbURI = process.env.MONGODB_URI;
    const dbConnectionInfo = await connectDB(dbURI);

    console.log(`MongoDB Connected to ${dbConnectionInfo.host}:${dbConnectionInfo.port}/${dbConnectionInfo.name}`);
  } catch (e) {
    console.error('Unable to connect to MongoDB');
    process.exit();
  }

  // Serve the app!!
  const port = Number(process.env.PORT) || 3001;

  try {
    await app.listen(port);
    console.log(`Application started on port ${port}`);
  } catch (e) {
    console.error(`Failed to run server on port ${port}. Is the port already used?`);
  }
})();
