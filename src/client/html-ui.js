/* eslint-env browser */
/* eslint-disable no-console */

var TableHelper = require("./table-helper");
var utils = require("../shared/utils");
var consoleUi = require("./console-ui");

var numberPropsToFixedWithDps = utils.numberPropsToFixedWithDps;
var convertPropsToStrings = utils.convertPropsToStrings;
var makeTableOpts = consoleUi.makeTableOpts;

function htmlTable(resources, opts) {
  opts = makeTableOpts(opts);
  // The keys we want to show, and the order to show them.

  var rows = resources
    // Only show numbers with fixed dps resolution.
    .map(numberPropsToFixedWithDps(opts.dps))
    // For the fake table we want all props to be strings
    .map(convertPropsToStrings);
  rows = TableHelper.makeTable(rows, opts);

  var w = window.open("", "");
  var html = [
    "<!doctype html>",
    "<html>",
    "<pre>",
    rows.join("\n"),
    "</pre>",
    "</html>"
  ].join("\n");
  w.document.write(html);
}

module.exports = {
  htmlTable: htmlTable
};
