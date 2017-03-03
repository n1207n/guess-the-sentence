'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';

import cors from 'kcors';
import logger from 'koa-logger';

import sessionMiddleware from './session';

// Load the app configuration
import '../config';

/**
 * A JS function that returns a composed Koa middleware set
 *
 * Used middlewares:
 * - CORS
 * - HTTP request auto body parsing
 * - Session based on MongoDB
 * - Concurrency Logger
 *
 * @return {koa-compose object}
 */
export default function middlewares() {
  return compose([
    logger,
    cors,
    sessionMiddleware,
  ]);
}
