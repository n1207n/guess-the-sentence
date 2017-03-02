'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';

import helmet from 'koa-helmet';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import createLogger from 'concurrency-logger';
import compress from 'koa-compress';

import sessionMiddleware from './session';

// Load the app configuration
import '../config';

/**
 * A JS function that returns a composed Koa middleware set
 *
 * Used middlewares:
 * - CORS
 * - Helmet security HTTP headers
 * - HTTP compression
 * - HTTP request auto body parsing
 * - Session based on MongoDB
 * - Concurrency Logger
 *
 * @return {koa-compose object}
 */
export default function middlewares() {
  return compose([
    // cors middleware is not compatible with Koa 2, so koa-convert is used
    convert(cors()),
    helmet,
    compress,
    bodyParser,
    sessionMiddleware,
    createLogger,
  ]);
}
