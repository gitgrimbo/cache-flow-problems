/* eslint-env amd */
define([
  "intern!object",
  "intern/chai!assert",
  "./load-test-data",
  "intern/dojo/node!../../src/shared/cache-query"
], function(registerSuite, assert, loadTestData, cacheQuery) {
  function makeTest(filename, expected, isCachedOpts) {
    return function() {
      // - Load the test data.
      // - Assert that areEntriesCached() returns what we expect.
      return loadTestData(filename)
        .then(data => {
          isCachedOpts = Object.assign({}, isCachedOpts, {
            location: data.url
          });
          if (expected === Error) {
            assert.throws(function() {
              cacheQuery.areEntriesCached(data.entries, isCachedOpts);
            });
          } else {
            assert.equal(cacheQuery.areEntriesCached(data.entries, isCachedOpts), expected);
          }
        });
    };
  }

  const suite = {
    name: "data-file-tests"
  };

  // Vanilla tests
  // [
  //    Browser/filename,
  //    first visit expected result,
  //    reload visit expected result,
  //    revisit visit expected result
  // ]
  const info = [
    // Chrome 53 first visit cached unknown.
    // Chrome 53 reload visit cached unknown.
    // Chrome 53 revisit visit cached due to all duration === 0.
    ["Chrome-53.0.2785.143", null, null, true],
    // FF 45+46 first visit not cached due to some transferSize > 0.
    // FF 45+46 reload visit not cached due to transferSize > 0.
    // FF 45+46 revisit visit cached unknown due to inconclusive xd transferSize values and some durations !== 0.
    ["Firefox-45.0", false, false, null],
    ["Firefox-46.0", false, false, null],
    // IE 10+11 all unknown.
    ["IE-10.0", null, null, null],
    ["IE-11.0", null, null, null],
    // IE9 no entries throws Error
    ["IE-9.0", Error, Error, Error]
  ];

  info.forEach(info => {
    const browser = info[0];
    const first = info[1];
    const reload = info[2];
    const revisit = info[3];

    function addTest(browser, tag, expected, testName) {
      const filename = (browser + "-" + tag);
      testName = testName || filename;
      suite[testName] = makeTest(filename, expected);
    }

    addTest(browser, "first", first);
    addTest(browser, "reload", reload);
    addTest(browser, "revisit", revisit);
  });

  // Tests with options

  // FF reports small duration if cached.
  suite["Firefox-45.0-revisit with opts"] = makeTest("Firefox-45.0-revisit", true, {
    durationThreshold: {
      cachedIfLowerThan: 5
    }
  });
  // IE 10 reports small duration if cached.
  suite["IE-10.0-revisit with opts"] = makeTest("IE-10.0-revisit", true, {
    durationThreshold: {
      cachedIfLowerThan: 5
    }
  });
  // IE 11 reports small duration if cached.
  suite["IE-11.0-revisit with opts"] = makeTest("IE-11.0-revisit", true, {
    durationThreshold: {
      cachedIfLowerThan: 5
    }
  });

  registerSuite(suite);
});
