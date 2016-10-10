/* eslint-env browser */
module.exports = function log(s) {
  if (window.console) {
    console.log(s);
  }
};
