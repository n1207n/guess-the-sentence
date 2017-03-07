'use strict';

import convert from 'koa-convert';

import cors from 'kcors';
import createLogger from 'concurrency-logger';
import helmet from "koa-helmet";
import bodyparser from "koa-bodyparser";

import sessionMiddleware from './session';

/**
 * A JS function that applies each middleware to passed in app
 *
 * Used middlewares:
 * - Concurrency Logger
 * - Session based on MongoDB
 * - CORS
 * - Security headers
 * - HTTP request auto body parsing
 *
 * @param  {Koa} app
 */
export default function middlewares(app) {
  app.use(createLogger({
    timestamp: true,
  }));
  app.use(convert(sessionMiddleware));
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser());
}
