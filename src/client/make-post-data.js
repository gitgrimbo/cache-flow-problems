/* eslint-env browser */
/* eslint-disable no-console */

var entriesUtils = require("../shared/entries-utils");
var compress = entriesUtils.compress;

module.exports = function makePostData(origin, resources, session, tag) {
  return {
    userAgent: navigator.userAgent,
    url: window.location.href,
    scriptOrigin: origin,
    timestamp: Date.now(),
    tag: tag || "",
    session: session || "",
    entries: resources ? compress(resources) : resources
  };
};
