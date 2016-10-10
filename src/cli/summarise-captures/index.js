var summariseCaptures = require("./summarise-captures");

var asyncGlob = require("../async-glob");
var makeFilter = require("../make-filter.js");

// yargs
module.exports = {
  command: "summarise-captures [glob]",

  describe: "Summarise capture information for the provided files/folders",

  builder(yargs) {
    return yargs.option("filter-ua", {
      description: "Filter by userAgent [RegExp]",
      type: "string"
    }).example("summarise-captures --filter-ua Firefox", "Shows only captures with userAgent including 'Firefox'.");
  },

  handler(argv) {
    const glob = argv.glob;
    asyncGlob(["."], glob.replace("\\", /\//gi), function(err, results) {
      if (err) {
        throw err;
      }
      results.forEach(f =>
        summariseCaptures.summariseFiles(f, makeFilter(argv)));
    });
  }
};
