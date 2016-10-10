function isEntryRestricted(entry) {
  // https://www.stevesouders.com/blog/2014/08/21/resource-timing-practical-tips/
  // "it’s important to determine if you have access to the restricted timing properties"
  return Boolean(!entry.requestStart);
}

function isEntryCached(entry, opts) {
  if (!entry) {
    throw new Error("entry must not be falsey");
  }

  opts = opts || {};
  var durationThreshold = opts.durationThreshold;
  var restricted = isEntryRestricted(entry);

  if (!restricted) {
    if ("transferSize" in entry) {
      // Firm decision. "transferSize" exists, we can access it, and it's 0. Considered cached.
      return (entry.transferSize === 0);
    }
  }

  if (durationThreshold) {
    if (durationThreshold.cachedIfLowerThan !== null && entry.duration < durationThreshold.cachedIfLowerThan) {
      // Firm decision. duration < durationThreshold.cachedIfLowerThan. Considered cached.
      return true;
    }
    if (durationThreshold.uncachedIfHigherThan !== null && entry.duration > durationThreshold.uncachedIfHigherThan) {
      // Firm decision. duration > durationThreshold.uncachedIfHigherThan. Considered uncached.
      return false;
    }
  } else if (entry.duration === 0) {
    // No explicit duration tests.
    // Firm decision. duration===0. Considered cached.
    return true;
  }

  // No decision
  return null;
}

function areEntriesCached(entries, opts) {
  if (!Array.isArray(entries)) {
    throw new Error("entries must be an array");
  }

  opts = opts || {};

  var isEntryCachedOpts = opts;

  var allCached = true;

  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];
    var isCached = isEntryCached(e, isEntryCachedOpts);
    if (isCached === false) {
      return false;
    } else if (isCached !== true) {
      allCached = false;
    }
  }

  if (allCached) {
    return true;
  }

  // No decision
  return null;
}

module.exports = {
  areEntriesCached: areEntriesCached,
  isEntryCached: isEntryCached
};
