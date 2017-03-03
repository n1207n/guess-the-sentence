'use strict';

import Router from 'koa-router';

import importDir from 'import-dir';

const routerList = [{folder: 'api', prefix: '/api'}, ];

// Credit goes to https://github.com/entria/koa-passport-mongoose-graphql/blob/master/src/server/routes/index.js
export default function routes(app) {
  routerList.map(current => {
    const routes = importDir(`./${current.folder}`);
    let router = new Router({prefix: current.prefix});

    // Visit each route module and pass a new router instance to register each route by verb
    Object.keys(routes).map(name => routes[name](router));

    // Append current sub routes
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
};
