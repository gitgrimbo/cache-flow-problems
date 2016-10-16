/* eslint-env browser */
var entriesUtils = require("../shared/entries-utils");
var getScriptOrigin = require("./script-origin");
var scriptLoader = require("./script-loader");
var log = require("./log");

var getResources = entriesUtils.getResources;

/* Use this style comment for bookmarklet */

function run(secureSrc, insecureSrc) {
  function rfc4122() {
    /* stackoverflow.com/a/2117523 */
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      var v = c === "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function onload() {
    function postok() {
      log("success posting data to " + origin);
    }

    function posterror() {
      log("error posting data to " + origin);
    }

    /* cacheFlowProblems should now be in the global namespace. */
    var cfp = cacheFlowProblems;
    var resources = getResources();
    log("resource count=" + resources.length);
    cfp.consoleTableFake(resources);

    var session = rfc4122();
    var tag = "";
    var origin = getScriptOrigin();
    cfp.postResources(origin, session, tag, postok, posterror);
  }

  function onerror(err) {
    log("error loading client script");
    log(err);
  }

  scriptLoader.addScriptsUntilSuccessful({
    onload: onload,
    onerror: onerror,
    className: "cache-flow-problems",
    srcs: [secureSrc, insecureSrc]
  });
}

function getOrigins() {
  var origins = ["https://localhost:8081", "http://localhost:8080"];
  var promptMsg = "Enter the secure and insecure origins, separated by a comma.";
  /* eslint-disable */
  origins = prompt(promptMsg, origins.join(",")).split(",");
  /* eslint-enable */
  if (origins.length < 2) {
    origins[1] = origins[0];
  }
  return {
    secure: origins[0],
    insecure: origins[1]
  };
}

var js = "/dist/client.js?" + new Date().getTime();
var origins = getOrigins();
run(origins.secure + js, origins.insecure + js);
