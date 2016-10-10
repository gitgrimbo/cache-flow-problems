var showCaptures = require("./show-captures");

var asyncGlob = require("../async-glob");
var makeFilter = require("../make-filter.js");

// yargs
module.exports = {
  command: "show-captures [glob]",

  describe: "Shows capture information for the provided files/folders",

  builder(yargs) {
    return yargs
      .option("filter-ua", {
        description: "Filter by userAgent [RegExp]",
        type: "string"
      })
      .option("name-max-len", {
        description: "Max length allowed for resource name",
        default: 70,
        type: "number"
      })
      .example("show-captures --filter-ua Firefox", "Shows only captures with userAgent including 'Firefox'.");
  },

  handler(argv) {
    const glob = argv.glob;
    asyncGlob(["."], glob.replace("\\", /\//gi), function(err, arrOfFileArr) {
      if (err) {
        throw err;
      }
      var nameMaxLen = argv.nameMaxLen;
      arrOfFileArr.forEach(arr =>
        arr.forEach(f =>
          showCaptures.showCapture(f, makeFilter(argv), nameMaxLen)));
    });
  }
};
