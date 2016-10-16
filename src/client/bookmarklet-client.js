/* eslint-env browser */
var entriesUtils = require("../shared/entries-utils");
var getScriptOrigin = require("./script-origin");
var addTextArea = require("./add-textarea");

var getResources = entriesUtils.getResources;

/* Use this style comment for bookmarklet */

function rfc4122() {
  /* stackoverflow.com/a/2117523 */
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0;
    var v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function displayResourcesInTextArea() {
  var resources = getResources();
  var session = rfc4122();
  var tag = "";
  var origin = getScriptOrigin();
  addTextArea(origin, resources, session, tag);
}

displayResourcesInTextArea();
