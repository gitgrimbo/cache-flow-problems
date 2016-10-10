const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const connect = require("connect");
const serveStatic = require("serve-static");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const uaParser = require("ua-parser-js");

const serverManager = require("./server-manager");

let capturesDir;
let resourcesId = Date.now();

function makeCaptureFilepath(body) {
  const ua = uaParser(body.userAgent);
  // The bookmarklet does not send resourcesId
  const resourcesId = body.resourcesId || Date.now();
  const filename = resourcesId + "-" + ua.browser.name + "-" + ua.browser.version + "-" + body.tag;
  return path.join(capturesDir, filename + ".json");
}

function handleResources(req, res, next) {
  if (req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    resourcesId++;
    return res.end(JSON.stringify({ resourcesId: resourcesId }));
  }

  if (req.method === "POST") {
    // TODO - Assumes a file with this name will be unique.
    // If there is a lot of traffic, maybe there can be clashes?
    const body = req.body.formData || req.body;
    const file = makeCaptureFilepath(body);
    const str = JSON.stringify(body, null, 1);
    return fs.writeFile(file, str, function(err) {
      if (err) {
        console.error(err);
        return res.end(String(err));
      }
      return res.end();
    });
  }

  return next();
}

const app = connect()
  .use(logger("combined"))
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use("/resources", handleResources)
  // serveStatic is required to serve the bookmarklet
  .use(serveStatic("."))
  .use(function(req, res) {
    res.end("The cache-flow-problems capture server");
  });

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem"))
};

module.exports = function startServer(opts) {
  capturesDir = opts.capturesDir || "./.captures";
  console.log("Saving captures to " + capturesDir);

  return serverManager.start({
    http: {
      server: https.createServer(httpsOptions, app),
      port: opts.httpsPort
    },
    https: {
      server: http.createServer(app),
      port: opts.httpPort
    }
  })
    .then(function(value) {
      console.log("Started https server on port " + opts.httpsPort);
      console.log("Started http server on port " + opts.httpPort);
      return value;
    });
};
