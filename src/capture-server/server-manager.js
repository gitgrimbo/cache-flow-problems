const es6promisify = require("es6-promisify");
const httpShutdown = require("http-shutdown");

function promisify(fn, thisArg) {
  return es6promisify(fn, { thisArg });
}

function listen(server) {
  return promisify(server.listen, server);
}

function shutdown(server) {
  return promisify(server.shutdown, server);
}

/**
 * @param {object} config
 *   Map with string properties mapping to { server, port } objects.
 */
function start(config) {
  const keys = Object.keys(config);

  let shutdownFuncs = [];
  let listenFuncs = [];
  keys.forEach(key => {
    const server = config[key].server;
    const port = config[key].port;
    const serverWithShutdown = httpShutdown(server);
    shutdownFuncs.push(shutdown(serverWithShutdown));
    listenFuncs.push(listen(server)(port));
  });

  const returnValue = {
    config,
    // Invoke the shutdown functions to get their Promises
    stopServers: () => Promise.all(shutdownFuncs.map(f => f()))
  };

  // Listen to all the servers to start them, and return a Promise resolving
  // to an object with the original config and a stopServers function.
  return Promise.all(listenFuncs).then(() => returnValue);
}

module.exports = {
  start
};
