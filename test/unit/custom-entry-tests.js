/* eslint-env amd */
define([
  "intern!object",
  "intern/chai!assert",
  "intern/dojo/node!../../src/shared/cache-query"
], function(registerSuite, assert, cacheQuery) {
  function restrictEntry(entry, restrict) {
    // true by default
    restrict = (restrict !== false);

    // Pretend the entry has restricted timing data, e.g. cross-domain without
    // appropriate timing headers.
    entry.requestStart = restrict ? 0 : 1;
    return entry;
  }

  function restrictedEntry(entry) {
    return restrictEntry(entry, true);
  }

  function unrestrictedEntry(entry) {
    return restrictEntry(entry, false);
  }

  const suite = {
    name: "custom-entry-tests",

    'null entry throws error': function() {
      const entry = null;
      assert.throws(function() {
        cacheQuery.isEntryCached(entry);
      });
    },
    'empty entry returns null': function() {
      const entry = {};
      const actual = cacheQuery.isEntryCached(entry);
      assert.equal(actual, null);
    },
    'entry with transferSize===0 returns true': function() {
      // entry not restricted, so transferSize===0 means cached.
      const entry = unrestrictedEntry({
        transferSize: 0
      });
      const actual = cacheQuery.isEntryCached(entry);
      assert.equal(actual, true);
    },
    'restricted entry with transferSize===0 returns null': function() {
      // entry restricted, so transferSize===0 is not useful information.
      const entry = restrictedEntry({
        transferSize: 0
      });
      const actual = cacheQuery.isEntryCached(entry);
      assert.equal(actual, null);
    },
    'entry with duration===0 returns true': function() {
      // duration===0 means cached
      const entry = unrestrictedEntry({
        duration: 0
      });
      const actual = cacheQuery.isEntryCached(entry);
      assert.equal(actual, true);
    },
    'restricted entry with duration===0 returns true': function() {
      // entry restricted, but this doesn't affect duration
      const entry = restrictedEntry({
        duration: 0
      });
      const actual = cacheQuery.isEntryCached(entry);
      assert.equal(actual, true);
    }
  };

  registerSuite(suite);
});
