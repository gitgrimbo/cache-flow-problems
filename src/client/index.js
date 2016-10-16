/* eslint-env browser */
/* eslint-disable no-console */

var dumbAssign = require("../shared/dumb-assign");
var cacheQuery = require("../shared/cache-query");
var TableHelper = require("./table-helper");
var consoleUi = require("./console-ui");
var htmlUi = require("./html-ui");
var entriesUtils = require("../shared/entries-utils");
var beacon = require("./beacon");

var cacheFlowProblems = window["cacheFlowProblems"] = (window["cacheFlowProblems"] || {});
cacheFlowProblems.TableHelper = TableHelper;
cacheFlowProblems.dumbAssign = dumbAssign;
dumbAssign(cacheFlowProblems, consoleUi);
dumbAssign(cacheFlowProblems, htmlUi);
dumbAssign(cacheFlowProblems, entriesUtils);
dumbAssign(cacheFlowProblems, beacon);
dumbAssign(cacheFlowProblems, cacheQuery);
