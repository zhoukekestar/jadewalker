# jadewalker
URL mapping for jade.

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
