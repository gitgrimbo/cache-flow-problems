/* eslint-disable no-console */

var utils = require("./utils");
var dumbAssign = require("./dumb-assign");

var removePropsOfType = utils.removePropsOfType;
var keysAndValuesToOb = utils.keysAndValuesToOb;

function getWindow() {
  // eslint-disable-next-line
  return (typeof window === "undefined") ? null : window;
}

function getResources() {
  var win = getWindow();
  if (!win) {
    return null;
  }
  if ("performance" in win && "getEntriesByType" in win.performance) {
    return makeEntriesDumb(win.performance.getEntriesByType("resource"));
  }
  // Null means not supported (or available).
  return null;
}

function compress(data) {
  var keys = (data.length > 0) ? Object.keys(data[0]) : [];
  var compressed = data.map(function(it) {
    return keys.map(function(key) {
      return it[key];
    });
  });
  return {
    keys: keys,
    data: compressed
  };
}

function decompress(entries) {
  if (!entries) {
    return null;
  }
  var keys = entries.keys;
  return entries.data.map(function(values) {
    return keysAndValuesToOb(keys, values);
  });
}

function makeEntriesDumb(entries) {
  return [].slice.call(entries)
    .map(function(e) {
      return dumbAssign({}, e);
    })
    .map(removePropsOfType("function"));
}

module.exports = {
  getResources: getResources,
  compress: compress,
  decompress: decompress,
  makeEntriesDumb: makeEntriesDumb
};
