const util = require('util');
const log = util.debuglog('jadewalker');
const fs = require('fs');
const path = require('path');
const entries = [];

/**
 * Get jade url from file
 * @param  {String} path File path
 * @return {String}  jadewalker urls
 */
const getJadeURL = path => {
  const content = String(fs.readFileSync(path));
  let key;
  key = (key = content.match(/jadewalker=(.*)/)) && key[1];
  return key;
}

/**
 * A file walker for view directory.
 * @param  {String} dir View Directory
 * @param  {String} root Root file path
 */
const walk = (dir, root) => {
  const directory = path.join(root, dir);

  fs.readdirSync(directory).forEach(file => {

    const fullpath = path.join(directory, file);
    const stat = fs.statSync(fullpath);
    const extname = path.extname(fullpath);

    if (stat.isFile() && (extname === '.jade' || extname === '.pug')) {
      let name = path.join( dir, path.basename(file));
      let url = getJadeURL(fullpath);

      if (url) {
        name = name.replace(/\\/g, '/');
        entries.push({
          view: name,
          urls: url.split(',').map(url => url.trim())
        });
      }

    } else if (stat.isDirectory()) {
      let subdir = path.join(dir, file)
      walk(subdir, root)
    }
  })
}

/**
 * Create routers for Express & Koa
 * @param  {Object} router Express Router OR Koa Router
 * @param  {String} dir    View directory
 * @param  {String} root   Root file path
 * @param  {String} type   Specify current application's framework.
 */
module.exports = ({ router, dir, root, type }) => {

  root = root || './';

  walk(root, dir);

  let code = '';

  entries.map(entry => {

    log(`jadewalker : ${entry.urls} => ${entry.view}`);

    if (type === 'express') {

      code += `;this.get(${JSON.stringify(entry.urls)}, (req, res) => {
        res.render('${entry.view}', {
          params: req.params,
          query: req.query
        })
      });`;

    } else if (type === 'koa2') {

      code += `;this.get(${JSON.stringify(entry.urls)}, async function (ctx) {
        await ctx.render('${entry.view}', {
          params: ctx.params,
          query: ctx.request.query
        });
      });`;

    } else {

      code += `;this.get(${JSON.stringify(entry.urls)}, function* () {
        this.render('${entry.view}', {
          params: this.params,
          query: this.request.query
        })
      });`;
    }
  })

  code = new Function(code);
  code.call(router);
  return router;
}
