import session from 'koa-generic-session';
import mongoStore from 'koa-generic-session-mongo';

// Use same MongoDB database for session
export default session({store: new mongoStore({
  url: process.env.MONGODB_URI,
})});
