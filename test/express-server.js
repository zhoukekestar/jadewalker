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

exports.listen = (port) => {
  app.listen(port)
}
