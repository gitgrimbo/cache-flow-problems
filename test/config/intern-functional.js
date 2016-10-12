/* eslint-env amd */
define([
  "intern",
  "intern/dojo/lang",
  "./intern-base"
], function(intern, lang, config) {
  config = lang.mixin(config, {
    proxyHost: "cache-flow-problems",

    // The port on which the instrumenting proxy will listen
    proxyPort: 9000,

    // A fully qualified URL to the Intern proxy
    proxyUrl: "http://cache-flow-problems:9000/",

    // Location of the Selenium grid.
    tunnelOptions: {
      hostname: "localhost",
      port: 4444
    },

    maxConcurrency: 4,

    environments: [],

    defaultTimeout: 60 * 1000,

    // One functional test.
    functionalSuites: ["test/functional/functional"]
  });

  var cacheFlowProblems = {
    findTimeout: 30 * 1000,
    asyncTimeout: 30 * 1000,
    protocol: "https",
    host: "cache-flow-problems",
    port: 8082,
    clientScriptPath: "/client/index.js",
    resourcesPath: "/resources"
  };

  // Override this from the command line as necessary
  config.urlToCaptureEntriesFor = intern.args.urlToCaptureEntriesFor;
  // Capture server is started by default. Must turn off from command line.
  config.startCaptureServer = (intern.args.startCaptureServer !== "false");

  config.cacheFlowProblems = cacheFlowProblems;

  return config;
});
