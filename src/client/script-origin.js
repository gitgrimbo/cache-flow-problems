/* eslint-env browser */
/* eslint-disable no-console */

// Try to get the origin from the <script> tag of *this* script.
// Note that this might return null if the <script> tag was not found,
// e.g. this code was inserted into a page by webdriver.
module.exports = function getScriptOrigin() {
  var scripts = document.querySelectorAll("script.cache-flow-problems");
  var thisScript = scripts[scripts.length - 1];
  if (!thisScript) {
    return null;
  }
  var origin = /.*?\/\/[^/]*/.exec(thisScript.src.split("?")[0])[0];
  return origin;
};
