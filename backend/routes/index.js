'use strict';

import KoaRouter from 'koa-router';
import compose from 'koa-compose';

import importDir from 'import-dir';

const routerList = [{folder: 'api', prefix: '/api'}, ];

// Credit goes to https://github.com/entria/koa-passport-mongoose-graphql/blob/master/src/server/routes/index.js
export default function routes() {
  const reducedRouterEntries = routerList.reduce((accumulated, current) => {
    const routes = importDir('./' + current.folder);
    const router = new KoaRouter({
      prefix: current.prefix,
    });

    // Visit each route module and pass a new router instance to register each route by verb
    Object.keys(routes).map(name => routes[name](router));

    // Append current sub routes
    return [router.routes(), router.allowedMethods(), ...accumulated];
  }, []);

  console.log("Loading routes...");
  return compose(reducedRouterEntries);
};
