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
    "requestStart", "responseStart", "responseEnd",
    "transferSize", "encodedBodySize", "decodedBodySize"
  ];
  // The headers to use.  Must match the order of "keys".
  var headers = [
    "name", "type", "stTime", "dur", "initType", "workSt", "redSt", "redEnd",
    "fetchSt", "dnsSt", "dnsEnd", "connSt", "connEnd", "secConnSt",
    "reqStart", "respSt", "respEnd", "txSz", "encBdSz", "decBdSz"
  ];
  return objectAssign({}, {
    dps: 2,
    maxColLength: 70,
    align: true,
    keys: keys,
    headers: headers
  }, opts);
}

var resourceTypeMappings = {
  frame: null,
  mark: null,
  measure: null,
  navigation: "nav",
  resource: "res",
  server: null
};

var resourceInitiatorTypeMappings = {
  xmlhttprequest: "xhr"
};

function shortenKnownValues(resource) {
  if (resource.initiatorType in resourceInitiatorTypeMappings) {
    resource = objectAssign({}, resource, {
      initiatorType: resourceInitiatorTypeMappings[resource.initiatorType]
    });
  }
  if (resource.entryType in resourceTypeMappings) {
    resource = objectAssign({}, resource, {
      entryType: resourceTypeMappings[resource.entryType]
    });
  }
  return resource;
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
    .map(shortenKnownValues)
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
