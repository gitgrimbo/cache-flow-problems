/* eslint-env browser */
/* eslint-disable no-console */

var entriesUtils = require("../shared/entries-utils");
var makePostData = require("./make-post-data");

var makeEntriesDumb = entriesUtils.makeEntriesDumb;
var getResources = entriesUtils.getResources;

function post(url, data, onload, onerror, onreadystatechange) {
  var xhr = new XMLHttpRequest();
  xhr.onload = onload;
  xhr.onerror = onerror;
  xhr.onreadystatechange = onreadystatechange;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(data));
}

function postResources(origin, session, tag, onload, onerror, onreadystatechange) {
  var resources = getResources();
  var data = makePostData(origin, resources, session, tag);
  var url = origin + "/resources";
  post(url, data, onload, onerror, onreadystatechange);
}

module.exports = {
  post: post,
  postResources: postResources,
  makePostData: makePostData,
  makeEntriesDumb: makeEntriesDumb
};
