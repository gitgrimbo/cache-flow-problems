/* eslint-env browser */
var dumbAssign = require("../shared/dumb-assign");
var log = require("./log");

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
    var src = opts.srcs[i];
    addScript(dumbAssign({}, opts, {
      src: src,
      onload: function() {
        log("addScriptsUntilSuccessful.onload: " + src);
        if (opts.onload) {
          opts.onload.apply(this, arguments);
        }
      },
      onerror: function() {
        log("addScriptsUntilSuccessful.onerror:" + src);
        i++;
        if (i < opts.srcs.length) {
          add(i);
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
