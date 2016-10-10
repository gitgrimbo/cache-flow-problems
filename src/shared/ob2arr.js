function ob2arr(ob, keys) {
  return keys
    .map(function(key) {
      return ob[key];
    });
}

function ob2arrWithKeys(keys) {
  return function(it) {
    return ob2arr(it, keys);
  };
}

module.exports = {
  ob2arr: ob2arr,
  ob2arrWithKeys: ob2arrWithKeys
};
