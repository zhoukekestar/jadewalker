const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const jadewalker = require('../index.js');

const app = new Koa();
const router = new Router();

app.use(views(`${__dirname}/views`));

jadewalker({
  router,
  dir: `${__dirname}/views`,
  type: 'koa2'
});

app.use(router.routes());

exports.listen = (port) => {
  app.listen(port);
}
