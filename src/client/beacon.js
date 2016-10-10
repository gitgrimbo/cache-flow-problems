/* eslint-env browser */
/* eslint-disable no-console */

var entriesUtils = require("../shared/entries-utils");

var compress = entriesUtils.compress;
var makeEntriesDumb = entriesUtils.makeEntriesDumb;
var getResources = entriesUtils.getResources;

// Try to get the origin from the <script> tag of *this* script.
// Note that this might return null if the <script> tag was not found,
// e.g. this code was inserted into a page by webdriver.
function getScriptOrigin() {
  var scripts = document.querySelectorAll("script.cache-flow-problems");
  var thisScript = scripts[scripts.length - 1];
  if (!thisScript) {
    return null;
  }
  var origin = /.*?\/\/[^/]*/.exec(thisScript.src.split("?")[0])[0];
  return origin;
}

function post(url, data, onload, onerror, onreadystatechange) {
  var xhr = new XMLHttpRequest();
  xhr.onload = onload;
  xhr.onerror = onerror;
  xhr.onreadystatechange = onreadystatechange;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(data));
}

function makePostData(origin, resources, session, tag) {
  return {
    userAgent: navigator.userAgent,
    url: window.location.href,
    scriptOrigin: origin,
    timestamp: Date.now(),
    tag: tag || "",
    session: session || "",
    entries: resources ? compress(resources) : resources
  };
}

function postResources(origin, session, tag, onload, onerror, onreadystatechange) {
  var resources = getResources();
  var data = makePostData(origin, resources, session, tag);
  var url = origin + "/resources";
  post(url, data, onload, onerror, onreadystatechange);
}

module.exports = {
  getScriptOrigin: getScriptOrigin,
  post: post,
  postResources: postResources,
  makePostData: makePostData,
  makeEntriesDumb: makeEntriesDumb
};
