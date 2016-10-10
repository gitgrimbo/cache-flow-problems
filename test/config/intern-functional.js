/* eslint-env amd */
define([
  "intern",
  "intern/dojo/lang",
  "intern/dojo/has",
  "./intern-base",
  "intern/dojo/has!host-node?./setup-local-server",
  "intern/dojo/has!host-node?./setup-capture-server"
], function(intern, lang, has, config, setupLocalServer, setupCaptureServer) {
  config = lang.mixin(config, {
    // The port on which the instrumenting proxy will listen
    proxyPort: 9000,

    // A fully qualified URL to the Intern proxy
    proxyUrl: "http://localhost:9000/",

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
    host: "localhost",
    port: 8082,
    clientScriptPath: "/client/index.js",
    resourcesPath: "/resources"
  };

  // Override this from the command line as necessary
  config.urlToCaptureEntriesFor = intern.args.urlToCaptureEntriesFor;
  // Capture server is started by default. Must turn off from command line.
  config.startCaptureServer = (intern.args.startCaptureServer !== "false");

  cacheFlowProblems.origin = cacheFlowProblems.protocol + "://" + cacheFlowProblems.host + ":" + cacheFlowProblems.port;

  config.cacheFlowProblems = cacheFlowProblems;

  if (has("host-node")) {
    var serverPromises = [];
    var handles = [];

    var useLocalServer = has("host-node") && !config.urlToCaptureEntriesFor;
    if (useLocalServer && setupLocalServer) {
      serverPromises.push(setupLocalServer(config));
    }
    var startCaptureServer = has("host-node") && config.startCaptureServer;
    if (startCaptureServer && setupCaptureServer) {
      serverPromises.push(setupCaptureServer(config));
    }

    config.setup = function() {
      return Promise.all(serverPromises).then(function(handles_) {
        console.log("config.setup() complete");
        handles = handles_;
      });
    };

    config.teardown = function() {
      var stopPromises = handles.map(function(handle) {
        return handle.stopServers();
      });
      return Promise.all(stopPromises).then(function() {
        console.log("config.teardown() complete");
      });
    };
  }

  return config;
});
