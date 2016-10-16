var dumbAssign = require("./dumb-assign");

function keysAndValuesToOb(keys, values) {
  return keys.reduce(function(ob, k, i) {
    ob[k] = values[i];
    return ob;
  }, {});
}

function removePropsOfType(type) {
  return function(it) {
    for (var k in it) {
      if (type === typeof it[k]) {
        delete it[k];
      }
    }
    return it;
  };
}

function convertPropsToStrings(it) {
  it = dumbAssign({}, it);
  for (var k in it) {
    it[k] = String(it[k]);
  }
  return it;
}

function numberPropsToFixed(it, dps) {
  it = dumbAssign({}, it);
  for (var k in it) {
    if (typeof it[k] === "number") {
      it[k] = Number(it[k].toFixed(dps));
    }
  }
  return it;
}

function numberPropsToFixedWithDps(dps) {
  return function(it) {
    return numberPropsToFixed(it, dps);
  };
}

module.exports = {
  keysAndValuesToOb: keysAndValuesToOb,
  numberPropsToFixed: numberPropsToFixed,
  numberPropsToFixedWithDps: numberPropsToFixedWithDps,
  removePropsOfType: removePropsOfType,
  convertPropsToStrings: convertPropsToStrings
};
