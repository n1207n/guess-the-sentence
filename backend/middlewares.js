'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';

import helmet from 'koa-helmet';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import createLogger from 'concurrency-logger';
import compress from 'koa-compress';

export default function middlewares() {
  return compose([
    convert(cors()),
    convert(helmet()),
    convert(bodyParser()),
    convert(compress()),
    convert(createLogger()),
  ]);
}
