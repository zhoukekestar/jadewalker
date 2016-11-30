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
