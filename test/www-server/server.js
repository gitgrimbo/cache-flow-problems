const http = require("http");
const url = require("url");

const connect = require("connect");
const serveStatic = require("serve-static");
const logger = require("morgan");
const cors = require("cors");
const serverManager = require("../../src/capture-server/server-manager");

const oneYearInMillis = 365 * 24 * 60 * 60 * 1000;

function attachQueryString(req, res, next) {
  req.query = url.parse(req.url, true).query;
  next();
}

function delay(delay) {
  return function(req, res, next) {
    setTimeout(next, delay);
  };
}

// https://www.w3.org/TR/resource-timing/#timing-allow-origin
function crossOriginResourceTiming() {
  return function(req, res, next) {
    const allow = (req.query.timingAllowOrigin === "true");
    if (allow) {
      res.setHeader("Timing-Allow-Origin", "*");
    }
    next();
  };
}

const corsOptionsDelegate = function(req, callback) {
  const allow = (req.query.useCors === "true");
  console.log(allow, req.query);
  callback(null, { origin: allow });
};

const app = connect()
  .use(logger("combined"))
  .use(attachQueryString)
  .use(cors(corsOptionsDelegate))
  .use(crossOriginResourceTiming())
  // Artificially add a delay to pad out the resource timings
  .use(delay(100))
  // These servers serve content from the repo root, not from ./test/www root.
  .use(serveStatic(".", { maxAge: oneYearInMillis }));

function startServers(opts) {
  return serverManager.start({
    http1: {
      server: http.createServer(app),
      port: opts.httpPort
    },
    http2: {
      server: http.createServer(app),
      port: opts.httpPort + 1
    }
  });
}

module.exports = {
  startServers
};
