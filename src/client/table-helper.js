var objectAssign = require("object-assign");

var ob2arrWithKeys = require("../shared/ob2arr").ob2arrWithKeys;
var str = require("../shared/string");

var pad = str.pad;
var squashStr = str.squash;

function makeTable(data, opts) {
  opts = objectAssign({}, {
    maxColLength: 50,
    align: true
  }, opts);

  function truncateStringProps(it) {
    it = objectAssign({}, it);
    for (var k in it) {
      var s = String(it[k]);
      if (s.length > opts.maxColLength) {
        s = squashStr(s, opts.maxColLength);
      }
      it[k] = s;
    }
    return it;
  }

  function maxColLengths(rows) {
    return rows
      .reduce(function(maxLengths, cols) {
        for (var i = 0; (i < cols.length) || (i < maxLengths.length); i++) {
          var maxLength = maxLengths[i] || 0;
          var colLength = (cols[i] || "").length;
          maxLengths[i] = Math.max(maxLength, colLength);
        }
        return maxLengths;
      }, []);
  }

  function align() {
    var mcl;
    return function(cols, i, rows) {
      if (!mcl) {
        mcl = maxColLengths(rows);
      }
      return cols
        .map(function(col, i) {
          return pad(col, mcl[i] + 1);
        });
    };
  }

  // Use provided keys, or try and deduce from the data.
  var keys = opts.keys || Object.keys(data[0])
    .filter(function(key) {
      // E.g. don't want toJSON(), etc.
      return (typeof data[0][key] !== "function");
    });

  var rows = data
    .map(truncateStringProps)
    .map(ob2arrWithKeys(keys));

  var headers = opts.headers || keys;
  rows = [headers].concat(rows);

  if (opts.align) {
    rows = rows.map(align());
  }

  return rows
    .map(function(cols) {
      return cols.join("");
    });
}

module.exports = {
  makeTable: makeTable
};
