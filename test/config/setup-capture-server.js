/* eslint-env amd */
define([
  "intern/dojo/node!../../src/capture-server/server"
], function(server) {
  function setupCaptureServer(config) {
    console.log("setupCaptureServer");
    return server({
      capturesDir: "./.captures",
      httpPort: 8081,
      httpsPort: 8082
    });
  }

  return setupCaptureServer;
});
