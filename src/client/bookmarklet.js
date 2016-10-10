/* eslint-env browser */
var entriesUtils = require("../shared/entries-utils");
var beacon = require("./beacon");
var scriptLoader = require("./script-loader");
var addTextArea = require("./add-textarea");
var log = require("./log");

var getResources = entriesUtils.getResources;
var postResources = beacon.postResources;
var getScriptOrigin = beacon.getScriptOrigin;

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
    var resources = getResources();
    log("resource count=" + resources.length);
    cacheFlowProblems.consoleTableFake(resources);

    var session = rfc4122();
    var tag = "";
    var origin = getScriptOrigin();
    postResources(origin, session, tag, postok, posterror);
  }

  function onerror() {
    var resources = getResources();
    var session = rfc4122();
    var tag = "";
    var origin = getScriptOrigin();
    addTextArea(origin, resources, session, tag);
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
