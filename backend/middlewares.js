'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';

import helmet from 'koa-helmet';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import createLogger from 'concurrency-logger';
import compress from 'koa-compress';
import session from 'koa-generic-session';
import mongoStore from 'koa-generic-session-mongo';

export default function middlewares() {
  return compose([
    convert(cors()),
    helmet,
    compress,
    bodyParser,
    session({store: new mongoStore()}),
    createLogger,
  ]);
}
