/* eslint-env amd */
define([
  "intern/dojo/has"
], function(has) {
  var config = {
    // Nothing should be instrumented
    excludeInstrumentation: /.*/,

    reporters: has("host-node") ? ["Pretty"] : [],

    // No loader config.
    loaderOptions: {},

    // No unit tests.
    suites: [],
    nodeSuites: ["test/unit/node"]
  };

  if (has("host-node")) {
    config.suites = config.suites.concat(config.nodeSuites);
  }

  return config;
});
