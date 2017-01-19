var fs        = require('fs')
  , path      = require('path')
  , entry     = {}
  , JADEWALKER= process.env.JADEWALKER === undefined ? true : false;

var getJadeURL = function(path) {
  var content = fs.readFileSync(path) + '';
  var key = (key = content.match(/jadewalker=(.*)/)) && key[1];
  return key;
}

function walk(dir, root) {

  var directory = path.join(root, dir);

  fs.readdirSync(directory).forEach(function (file) {

      var fullpath = path.join(directory, file)
        , stat = fs.statSync(fullpath)
        , extname = path.extname(fullpath)

      if (stat.isFile() && (extname === '.jade' || extname === '.pug')) {

        var name = path.join( dir, path.basename(file));

        var url = getJadeURL(fullpath);
        if (url) {
          name = name.replace(/\\/g, '/');
          entry[name] = url.split(',');
        }

      } else if (stat.isDirectory()) {
        var subdir = path.join(dir, file)
        walk(subdir, root)
      }
    })
}

// It seems doesn't work...
// http://stackoverflow.com/questions/25623041/how-to-configure-dynamic-routes-with-express-js
//
// module.exports = function(router, dir, root) {

//   root = root || './';

//   walk(root, dir);

//   for (var i in entry) {
//     console.log(`jadewalker : ${i} => ${entry[i]}`);
//     router.get(entry[i], (req, res) => res.render(i, {params: req.params, query: req.query}));
//   }
// }

module.exports = function(router, dir, root) {

  var type = 'express';

  // Express app
  // var express = require('express')
  // var app = express();
  // require('jadewalker')(app, path.join(__dirname, 'views'));
  if (router.engine) {
    type = 'express'

  // Koa router
  // va app = require('koa')()
  // var router = require('koa-router')();
  // router = require('jadewalker')(router, path.join(__dirname, 'views'));
  // app.use(router.routes());
  } else if (router.middleware) {
    type = 'koa'

  // Default
  } else {
    type = 'express';
  }

  root = root || './';

  walk(root, dir);

  var code = '';

  for (var i in entry) {

    JADEWALKER && console.log(`jadewalker : ${entry[i]} => ${i}`);

    if (type === 'express') {

      code += "this.get(" + JSON.stringify(entry[i]) + ", function(req, res) {" +
        "res.render('" + i + "', {params: req.params, query: req.query})" +
      "});";

    } else {

      code += "this.get(" + JSON.stringify(entry[i]) + ", function*() {" +
        "this.render('" + i + "', {params: this.params, query: this.request.query})" +
      "});";
    }

  }

  code = new Function(code);
  code.call(router);
  return router;
}
