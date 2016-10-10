/* eslint-disable no-console */
var objectAssign = require("object-assign");

var TableHelper = require("./table-helper");
var utils = require("../shared/utils");

var numberPropsToFixedWithDps = utils.numberPropsToFixedWithDps;
var convertPropsToStrings = utils.convertPropsToStrings;

function makeTableOpts(opts) {
  var keys = [
    "name", "entryType", "startTime", "duration", "initiatorType", "workerStart", "redirectStart", "redirectEnd",
    "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "secureConnectionStart",
    "requestStart", "responseStart", "responseEnd"
  ];
  // The headers to use.  Must match the order of "keys".
  var headers = [
    "name", "type", "stTime", "dur", "initType", "workSt", "redSt", "redEnd",
    "fetchSt", "dnsSt", "dnsEnd", "connSt", "connEnd", "secureConnSt",
    "reqStart", "respSt", "respEnd"
  ];
  return objectAssign({}, {
    dps: 2,
    maxColLength: 70,
    align: true,
    keys: keys,
    headers: headers
  }, opts);
}

function _consoleTable(resources, opts) {
  opts = makeTableOpts(opts);
  // Only show numbers with fixed dps resolution.
  var rows = resources.map(numberPropsToFixedWithDps(opts.dps));
  console.table(rows);
}

function consoleTableFake(resources, opts) {
  opts = makeTableOpts(opts);
  // The keys we want to show, and the order to show them.

  var rows = resources
    // Only show numbers with fixed dps resolution.
    .map(numberPropsToFixedWithDps(opts.dps))
    // For the fake table we want all props to be strings
    .map(convertPropsToStrings);
  rows = TableHelper.makeTable(rows, opts);

  rows
    .forEach(function(line) {
      console.log(line);
    });
}

function consoleTable(resources, opts) {
  if (console.table) {
    _consoleTable(resources, opts);
  } else {
    consoleTableFake(resources, opts);
  }
}

module.exports = {
  _consoleTable: _consoleTable,
  consoleTable: consoleTable,
  consoleTableFake: consoleTableFake,
  makeTableOpts: makeTableOpts
};
