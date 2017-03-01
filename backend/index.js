// Load your SECRET DATA from your .env file
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config({path: './.dev.env'});
} else {
  require('dotenv').config({path: './.dev.env'});
}

import Koa from 'koa';

import {connectDB} from './db';
import middlewares from './middlewares';

const app = new Koa();

app.use(middlewares());

(async() => {
  try {
    const dbURI = process.env.MONGODB_URI;
    const dbConnectionInfo = await connectDB(dbURI);

    console.log(`Connected to ${dbConnectionInfo.host}:${dbConnectionInfo.port}/${dbConnectionInfo.name}`);
  } catch (e) {
    console.error('Unable to connect to MongoDB');
  }

  await app.listen(3001);
  console.log(`Application started on port ${3001}`);
})();
