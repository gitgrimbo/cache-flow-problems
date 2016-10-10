var fs = require("fs");
var path = require("path");
var glob = require("glob");
var async = require("async");

module.exports = function asyncGlob(files, pattern, callback) {
  function globber(file, callback) {
    file = path.resolve(file);
    if (!fs.lstatSync(file).isDirectory()) {
      return file;
    }

    var options = {
      cwd: file,
      realpath: true
    };

    glob(pattern, options, callback);
  }
  async.map(files, globber, callback);
};
