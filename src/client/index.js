/* eslint-env browser */
/* eslint-disable no-console */

var utils = require("../shared/utils");
var dumbAssign = require("../shared/dumb-assign");
var cacheQuery = require("../shared/cache-query");
var TableHelper = require("./table-helper");
var consoleUi = require("./console-ui");
var htmlUi = require("./html-ui");
var entriesUtils = require("../shared/entries-utils");
var beacon = require("./beacon");

var assign = utils.assign;

var cacheFlowProblems = window["cacheFlowProblems"] = (window["cacheFlowProblems"] || {});
cacheFlowProblems.TableHelper = TableHelper;
cacheFlowProblems.dumbAssign = dumbAssign;
assign(cacheFlowProblems, consoleUi);
assign(cacheFlowProblems, htmlUi);
assign(cacheFlowProblems, entriesUtils);
assign(cacheFlowProblems, beacon);
assign(cacheFlowProblems, cacheQuery);
