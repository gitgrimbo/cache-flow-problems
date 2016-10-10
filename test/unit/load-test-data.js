/* eslint-env amd */
define([
  "require",
  "intern/dojo/node!fs",
  "intern/dojo/node!path",
  "intern/dojo/node!es6-promisify",
  "intern/dojo/node!../../src/shared/entries-utils"
], function(require, fs, path, promisify, entriesUtils) {
  function loadTestData(name, decompress) {
    // true by default
    decompress = (decompress !== false);

    const filepath = require.toUrl("../../results/" + name + ".json");

    const p = promisify(fs.readFile)(filepath)
      .then(data => JSON.parse(data));

    return decompress ? p.then(data => {
      data.entries = entriesUtils.decompress(data.entries);
      return data;
    }) : p;
  }

  return loadTestData;
});
