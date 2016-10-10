const ejs = require("ejs");
const fsp = require("fs-promise");
const path = require("path");
const useragent = require("express-useragent");

const cacheQuery = require("../shared/cache-query");
const decompress = require("../shared/entries-utils").decompress;
const makeTableData = require("../cli/show-captures/show-captures").makeTableData;

const resultsPath = "./results/";
const filename = path.resolve(__dirname, "index.html");

function loadResults() {
  return fsp.readdir(resultsPath)
    .then(files => {
      // full paths
      files = files.map(f => path.resolve(resultsPath, f));
      const promises = files.map(f => fsp.readFile(f).then(JSON.parse));
      return Promise.all(promises);
    });
}

function resultsToTemplateData(results) {
  return results.map(r => {
    r.isCached = null;
    if (r.entries) {
      r.entries = decompress(r.entries);
      r.entries.forEach(e => e.isCached = cacheQuery.isEntryCached(e));
      r.isCached = cacheQuery.areEntriesCached(r.entries);
    }
    const ua = useragent.parse(r.userAgent);
    r.name = ua.browser + " " + ua.version + " " + ua.os + " / " + r.tag;
    return r;
  });
}

function generate(templateStr, results) {
  let tableData = null;
  results = resultsToTemplateData(results);

  const configurations = [
    {
      title: "Default options",
      description: "Only visits that strictly have all (duration === 0ms) and/or accessible (transferSize === 0) are considered cached.",
      opts: {}
    }, {
      title: "Treat (duration < 5ms) as cached",
      description: "Starts to consider IE 10 revisits, IE 11 revisits, some FF revisits as cached.",
      opts: {
        durationThreshold: {
          cachedIfLowerThan: 5
        }
      }
    }, {
      title: "Treat (duration > 50ms) as uncached",
      description: "Use both cachedIfLowerThan and uncachedIfHigherThan thresholds to consider slower durations as uncached.",
      opts: {
        durationThreshold: {
          cachedIfLowerThan: 5,
          uncachedIfHigherThan: 50
        }
      }
    }
  ];

  function headers(result) {
    tableData = makeTableData(result.entries);
    return tableData.header;
  }

  function row(entry) {
    return tableData.row(entry);
  }

  function getResults(configurationIndex) {
    const opts = configurations[configurationIndex].opts;
    // Alter the results for the configuration.
    results.forEach(r => {
      r.isCached = null;
      if (r.entries) {
        r.entries.forEach(e => e.isCached = cacheQuery.isEntryCached(e, opts));
        r.isCached = cacheQuery.areEntriesCached(r.entries, opts);
      }
      return r;
    });
    return results;
  }

  const data = {
    configurations,
    funcs: {
      getResults,
      headers,
      row,
      isCachedClass(isCached) {
        if (isCached === null) {
          return "";
        }
        return isCached ? "cached" : "uncached";
      }
    }
  };

  const renderOpts = {
    compileDebug: true
  };
  const html = ejs.render(String(templateStr), data, renderOpts);
  console.log(html);
}

Promise.all([fsp.readFile(filename), loadResults()])
  .then(things => {
    const templateStr = things[0];
    const results = things[1];
    generate(templateStr, results);
  });
