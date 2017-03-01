import Koa from 'koa';

import middlewares from './middlewares';

const app = new Koa();

app.use(middlewares());

app.listen(3001);
