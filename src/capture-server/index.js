var yargs = require("yargs");
var path = require("path");
var mkdirp = require("mkdirp");
var startServer = require("./server");

// yargs
var argv = yargs
  .option("captures-dir", {
    describe: "The folder to store the captures.",
    default: "./.captures"
  })
  .option("https", {
    describe: "Port to use for https.",
    default: 8081,
    type: "number"
  })
  .option("http", {
    describe: "Port to use for http.",
    default: 8080,
    type: "number"
  })
  .help("help")
  .strict()
  .wrap(100)
  .argv;

var capturesDir = path.resolve(argv.capturesDir);

mkdirp(capturesDir, function() {
  startServer({
    capturesDir: capturesDir,
    httpPort: argv.http,
    httpsPort: argv.https
  });
});
