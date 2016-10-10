/* eslint-env amd */
define([
  "intern/dojo/node!../www-server/server"
], function(server) {
  function setupLocalServer(config) {
    console.log("setupLocalServer");
    var localServerPort = 8083;

    config.urlToCaptureEntriesFor = "http://localhost:" + localServerPort + "/test/www/";

    console.log("setupLocalServer", "Starting test servers");
    return server.startServers({
      httpPort: localServerPort
    })
      .then(function(handle) {
        console.log("setupLocalServer", "Test servers started");
        Object.keys(handle.config).forEach(key => console.log(key, handle.config[key].port));
        return handle;
      });
  }

  return setupLocalServer;
});
