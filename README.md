# jadewalker
URL mapping for jade & pug. Because we can't create dynamic routers like this: [More Detail](http://stackoverflow.com/questions/25623041/how-to-configure-dynamic-routes-with-express-js)

```js
entries.map(entry => {
  router.get(entry.url, req => res.render(entry.view));
})
```

# Install & Usage
* `npm install jadewalker` to install jadewalker.
* Set jadewalker in `jade` OR `pug` file.
  ```jade
  //- jadewalker=/hello/:name
  doctype html
  html
    title jadewalker
  body
    p Hello #{params.name || "jadewalker"}!
  ```
* API
  * `router` Express router OR Koa router.
  * `dir` View directory.
  * `type`
    * `express` Create routers for Express application.
    * `koa` Create routers for Koa application.
    * `koa2` Create routers for Koa@2 application.

# Koa2
```js
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
app.listen(3000);
```

# Express
```js
const express = require('express')
const jadewalker = require('../index.js');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');

jadewalker({
  router: app,
  dir: `${__dirname}/views`,
  type: 'express'
});

app.listen(3000);
```

# Debug
Set `NODE_DEBUG=jadewalker` to show debug log.
