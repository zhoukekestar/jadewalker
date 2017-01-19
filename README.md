# jadewalker
URL mapping for jade & pug (based on express).

# Usage
```js
require('jadewalker')(router , dir);
```

# Express
```js
var express = require('express')
var app = express();
require('jadewalker')(app, path.join(__dirname, 'views'));
```

# Koa
```js
va app = require('koa')()
var router = require('koa-router')();
router = require('jadewalker')(router, path.join(__dirname, 'views'));
app.use(router.routes());
```

# Disable Log
Set `process.env.JADEWALKER = false` will disable log.

# Demo
* app.js
```js
var express = require('express')
  , app     = express()
  , path    = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

require('jadewalker')(app , path.join(__dirname, 'views'));

app.listen(3000)
```
* a.jade
```jade
//- jadewalker=/a
doctype html
html
  title a.jade
body
  p a.jade
```
* b.jade
```jade
//- jadewalker=/b,/b/:id
doctype html
html
  title b.jade
body
  p b.jade
  p params: #{params.id}
```
