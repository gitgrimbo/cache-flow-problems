# About

The utilities in this repo use
[`Performance.getEntriesByType("resource")`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType)
data from the browser to try and determine if the page (and its resources) was
loaded from cache.

The Resource Timing spec is available at https://www.w3.org/TR/resource-timing/.

The main objectives of this repo are to provide ways to

- capture `Performance.getEntriesByType("resource")` data from a web page.
- provide an *is-page-cached* API that uses the captured data.

---

# Results

To see the sorts of results captured: https://gitgrimbo.github.io/cache-flow-problems/.

---

# Usage

## API

```js
const api = require("./src/shared/cache-query");
let entries = performance.getEntriesByType("resource");
entries = entries.filter(/* filter resources as required */);

// No options
// Only visits that strictly have all (duration === 0ms)
// and/or accessible (transferSize === 0) are considered cached.
api.areEntriesCached(entries);

// With options
// E.g. treat durations less than 5ms as cached.
api.areEntriesCached(entries, {
  durationThreshold: {
    cachedIfLowerThan: 5
  }
});

// With options
// E.g. treat durations greater than 50ms as uncached.
api.areEntriesCached(entries, {
  durationThreshold: {
    uncachedIfHigherThan: 50
  }
});
```

## Capturing data 1 - Functional tests

Functional tests are used to capture
`Performance.getEntriesByType("resource")` data from a test web page.

Start local Selenium. E.g. if you have
[downloaded Selenium Standalone](http://www.seleniumhq.org/download/), run:

`java -jar selenium-server-standalone-x.y.z.jar`

Run the [tests](test/intern/README.md). This will run tests, gather
data, and submit to the capture server. Edit the environments property in
[intern-functional-standalone.js](test/config/intern-functional-standalone.js)
for the browsers you have installed.

## Capturing data 2 - Bookmarklet

See [Client](./src/client/README.md).

---

# Components

There are several components:

- A client JS file that can be inserted into the PUT (page under test) to
  beacon back resource data.
- A bookmarklet JS file that can be run manually on the PUT if the PUT has a
  strict CSP (Content Security Policy) (i.e. does not allow 3rd party scripts).
- A capture server that receives and saves the beaconed resource data.
- CLI apps to query the stored resource data.

Those components are documented individually:

- [Client](./src/client/README.md)
- [Capture server](./src/capture-server/README.md)
- [CLI](./src/cli/README.md)

---

# How to determine if a resource was loaded from cache?

First, the browser needs to support the Resource Timing API:

- http://caniuse.com/#feat=resource-timing.

As of 21/07/2016 the most obvious omissions are IE9, Safari, iOS Safari and
Opera Mini.

Next, the browser will only expose certain timings according to cross-origin
restrictions:

- Same-domain resource: All timings available.
- Cross-origin resource: Following timings not available without an explicit
  `Timing-Allow-Origin` HTTP response header.
  - redirectStart, redirectEnd, domainLookupStart, domainLookupEnd,
    connectStart, connectEnd, requestStart, responseStart, and
    secureConnectionStart.

There is no specific API to determine if a resource was served from browser
cache, so the following generalisations must be made:

- Chrome <54 - Duration will be zero or 'close to zero' (few ms) if the resource
  came from browser cache.
- Chrome 54 - [The Resource Timing API now supports transfer, encoded, and
  decoded size attributes, allowing developers to measure cache hit rates and
  byte usage](https://blog.chromium.org/2016/09/chrome-54-beta-custom-elements-v1.html).
- IE11 - Check for duration as zero or 'close to zero' (few ms).
- IE10 - Check for duration as zero or 'close to zero' (few ms).
- IE9 - Resource Timing not supported.
- Firefox 35-44 - Check for duration as zero or 'close to zero' (few ms).
- Firefox >=45
  - if same-origin then check
    [transferSize](https://w3c.github.io/resource-timing/#dom-performanceresourcetiming-transfersize)
    is zero.
  - if cross-origin and passes the
    [timing allow check](https://w3c.github.io/resource-timing/#timing-allow-check)
    algorithm then check
    [transferSize](https://w3c.github.io/resource-timing/#dom-performanceresourcetiming-transfersize)
    is zero.
  - if cross-origin and fails the
    [timing allow check](https://w3c.github.io/resource-timing/#timing-allow-check)
    then use duration as above.

# License

MIT © [Paul Grime](https://github.com/gitgrimbo/)
