const fs = require("fs");
const path = require("path");
const Table = require("cli-table");
const useragent = require("express-useragent");

const numberPropsToFixedWithDps = require("../../shared/utils").numberPropsToFixedWithDps;
const squashStr = require("../../shared/string").squash;
const decompressEntries = require("../../shared/entries-utils").decompress;
const ob2arr = require("../../shared/ob2arr").ob2arr;

const numberPropsToFixed2Dps = numberPropsToFixedWithDps(2);

function entry2arr(e, keys, opts) {
  opts = opts || {};
  e = numberPropsToFixed2Dps(e);
  e.name = opts.nameMaxLen ? squashStr(e.name, opts.nameMaxLen) : e.name;
  return ob2arr(e, keys);
}

function sortByMappings(mappings) {
  return function(a, b) {
    const m1 = mappings[a];
    const m2 = mappings[b];
    const pos1 = m1 && m1[1];
    const pos2 = m2 && m2[1];
    if (typeof pos1 !== "number") {
      return 1;
    }
    if (typeof pos2 !== "number") {
      return -1;
    }
    return pos1 - pos2;
  };
}

const headerMappings = {
  name: ["name", 0],
  // All entries are resources, so this is redundant
  //entryType: ["entType", 1],
  startTime: ["stTime", 2],
  duration: ["dur", 3],
  initiatorType: ["initType", 4],
  workerStart: ["workSt", 5],
  redirectStart: ["redSt", 6],
  redirectEnd: ["redEnd", 7],
  fetchStart: ["fetSt", 8],
  domainLookupStart: ["domSt", 9],
  domainLookupEnd: ["domEnd", 10],
  connectStart: ["connSt", 11],
  connectEnd: ["connEnd", 12],
  secureConnectionStart: ["secConnSt", 13],
  requestStart: ["reqSt", 14],
  responseStart: ["resSt", 15],
  responseEnd: ["resEnd", 16],
  transferSize: ["txSz", 17],
  encodedBodySize: ["encBodSz", 18],
  decodedBodySize: ["decBodSz", 19],
  nextHopProtocol: ["nhp", 20]
};

function makeTableData(entries, entry2arrOpts) {
  const e0 = entries[0];
  const keys = Object.keys(e0);
  keys.sort(sortByMappings(headerMappings));

  function row(entry) {
    return entry2arr(entry, keys, entry2arrOpts);
  }

  return {
    header: keys.map(k => (headerMappings[k] && headerMappings[k][0]) || k),
    rows: entries.map(row),
    row
  };
}

function showCapture(captureFile, filter, nameMaxLen) {
  const dataStr = fs.readFileSync(path.resolve(captureFile));
  const data = JSON.parse(dataStr);
  data.entries = decompressEntries(data.entries);

  if (!filter(captureFile, data)) {
    return;
  }

  const ua = useragent.parse(data.userAgent);
  console.log("User Agent:           " + data.userAgent);
  console.log("Browser, Version, OS: " + ua.browser + "   " + ua.version + "   " + ua.os);
  console.log("Session:              " + data.session);
  console.log("Tag:                  " + data.tag);

  if (data.entries && data.entries.length > 0) {
    const entry2arrOpts = {
      nameMaxLen: nameMaxLen
    };
    const tableData = makeTableData(data.entries, entry2arrOpts);
    const table = new Table({
      head: tableData.header
    });
    tableData.rows.forEach(row => table.push(row));

    console.log(table.toString());
  } else {
    console.log("-----NO ENTRIES-----");
  }
}

module.exports = {
  entry2arr,
  makeTableData,
  showCapture
};
