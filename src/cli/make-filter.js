function noop() {
  return true;
}

function uaFilter(pattern) {
  var re = new RegExp(pattern);
  return function(file, data, i) {
    return data.userAgent.match(re);
  };
}

module.exports = function makeFilter(argv) {
  var filters = [];

  if (argv.filterUa) {
    filters.push(uaFilter(argv.filterUa));
  }

  if (filters.length === 0) {
    return noop;
  }

  return function(file, data) {
    for (var i = 0; i < filters.length; i++) {
      if (!filters[i](file, data, i)) {
        return false;
      }
    }
    return true;
  };
};
