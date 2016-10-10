/* eslint-env browser */
var utils = require("../shared/utils");
var log = require("./log");

var assign = utils.assign;

function addScript(opts) {
  opts = opts || {};

  var s = document.createElement("script");

  s.className = opts.className || "";
  s.onload = opts.onload;
  s.onerror = opts.onerror;
  s.type = "text/javascript";
  s.src = opts.src;

  var h = document.getElementsByTagName("head")[0];
  var parent = opts.addTo || h || document.body;
  parent.appendChild(s);
}

function addScriptsUntilSuccessful(opts) {
  function add(i) {
    addScript(assign({}, opts, {
      src: opts.srcs[i],
      onload: function() {
        log("addScriptsUntilSuccessful.onload");
        if (opts.onload) {
          opts.onload.apply(this, arguments);
        }
      },
      onerror: function() {
        log("addScriptsUntilSuccessful.onerror");
        if (i < opts.srcs.length) {
          add(i + 1);
        } else if (opts.onerror) {
          opts.onerror.apply(this, arguments);
        }
      }
    }));
  }
  add(0);
}

module.exports = {
  addScript: addScript,
  addScriptsUntilSuccessful: addScriptsUntilSuccessful
};
