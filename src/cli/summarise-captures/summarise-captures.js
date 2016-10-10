var path = require("path");
var Table = require("cli-table");
var useragent = require("express-useragent");

var ob2arr = require("../../shared/ob2arr").ob2arr;
var decompressEntries = require("../../shared/entries-utils").decompress;

function copyProps(dest, src, props) {
  props.forEach(p => dest[p] = src[p]);
  return dest;
}

function setNullsAndUndefinedsToEmptyString(ob) {
  for (var k in ob) {
    if (ob[k] === null || typeof ob[k] === "undefined") {
      ob[k] = "";
    }
  }
  return ob;
}

function splitUserAgent(ob, ua) {
  ua = useragent.parse(ua);
  ua = copyProps({}, ua, ["browser", "version", "os"]);
  return Object.assign(ob, ua);
}

function summer(property) {
  return function(arr) {
    return arr.reduce((sum, item) => {
      const p = item[property];
      if (typeof p === "number") {
        sum = (sum === null) ? p : sum + p;
      }
      return sum;
    }, null);
  };
}

function averageDuration(entries) {
  return entries.reduce((sum, e) => sum + e.duration, 0) / entries.length;
}

function summariseFiles(files, filter) {
  function file2arr(file, data, headers) {
    // split the useragent into 3 fields.
    if (data.userAgent) {
      data = splitUserAgent(data, data.userAgent);
    }

    // add a new field for entries count
    var entries = data.entries;
    data.entries = entries ? entries.length : "";
    data["avg duration"] = entries ? averageDuration(entries).toFixed(2) : "";
    data.transferSize = entries ? summer("transferSize")(entries) : "";
    data.filename = path.basename(file);

    setNullsAndUndefinedsToEmptyString(data);

    return ob2arr(data, headers);
  }

  function summariseFile(file, headers) {
    var data = require(file);
    data.entries = decompressEntries(data.entries);

    if (!filter(file, data)) {
      return null;
    }

    return file2arr(file, data, headers);
  }

  var headers = [
    "filename",
    "timestamp",
    "session",
    "browser",
    "version",
    "os",
    "tag",
    "entries",
    "avg duration",
    "transferSize"
  ];
  var table = new Table({
    head: headers
  });
  files.forEach(file => {
    var row = summariseFile(file, headers);
    if (row) {
      table.push(row);
    }
  });
  console.log(table.toString());
}

module.exports = {
  summariseFiles
};
