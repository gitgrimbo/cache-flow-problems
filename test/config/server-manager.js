/* eslint-env amd */
define([
  "intern/dojo/has!host-node?./setup-local-server",
  "intern/dojo/has!host-node?./setup-capture-server"
], function(setupLocalServer, setupCaptureServer) {
  class ServerManager {
    constructor() {
      this.handles = [];
    }

    setup(config) {
      console.log("ServerManager.setup");
      var serverPromises = [];

      var useLocalServer = !config.urlToCaptureEntriesFor;
      if (useLocalServer && setupLocalServer) {
        var localServerPort = 8083;
        config.urlToCaptureEntriesFor = "http://cache-flow-problems:" + localServerPort + "/test/www/";
        serverPromises.push(setupLocalServer(localServerPort));
      }
      var startCaptureServer = config.startCaptureServer;
      if (startCaptureServer && setupCaptureServer) {
        serverPromises.push(setupCaptureServer(config));
      }

      return Promise.all(serverPromises).then(handles_ => {
        console.log("ServerManager.setup complete");
        this.handles = handles_;
      });
    }

    teardown() {
      console.log("ServerManager.teardown");
      const stopPromises = this.handles.map(function(handle) {
        return handle.stopServers();
      });
      return Promise.all(stopPromises).then(function() {
        console.log("ServerManager.teardown complete");
      });
    }

    handleStartAndStop(config) {
      const self = this;
      config.setup = function() {
        const cacheFlowProblems = config.cacheFlowProblems;
        cacheFlowProblems.origin = cacheFlowProblems.protocol + "://" + cacheFlowProblems.host + ":" + cacheFlowProblems.port;
        return self.setup(config);
      };
      config.teardown = function() {
        return self.teardown();
      };
    }
  }

  return ServerManager;
});
