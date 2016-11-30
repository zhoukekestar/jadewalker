var fs        = require('fs')
  , path      = require('path')
  , entry     = {};

var getJadeURL = function(path) {
  var content = fs.readFileSync(path) + '';
  var key = (key = content.match(/jadewalker=(.*)/)) && key[1];
  return key;
}

function walk(dir, root) {
  var directory = path.join(root, dir);
  fs.readdirSync(directory)
    .forEach(function (file) {
      var fullpath = path.join(directory, file)
      var stat = fs.statSync(fullpath)

      if (stat.isFile() && path.extname(fullpath) === '.jade') {
        var name = path.join( dir, path.basename(file, '.jade'));

        var url = getJadeURL(fullpath);
        if (url) {
          entry[name] = url.split(',');
        }

      } else if (stat.isDirectory()) {
        var subdir = path.join(dir, file)
        walk(subdir, root)
      }
    })
}


module.exports = function(router, dir, root) {

  root = root || './';

  walk(root, dir);

  for (var i in entry) {
    console.log(`jadewalker : ${i} => ${entry[i]}`);
    router.get(entry[i], (req, res) => res.render(i, {params: req.params, query: req.query}));
  }
}
