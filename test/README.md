# About

The tests use [Intern](https://theintern.github.io/intern/).

There are unit tests and functional tests.

The unit tests test the *was-the-site-loaded-from-cache* decision making,
and the functional tests are used to capture Resource Timing data from a
[dummy site](./www/) (which can be used as input to the the
*was-the-site-loaded-from-cache* decision making code).

The functional test will use the URL set by `config.urlToCaptureEntriesFor`
in the `test/intern/intern-functional.js` file and:

- Open the URL, capture the `Performance.getEntriesByType("resource")` data
  using the tag `first`.
- Call `window.location.reload(true)` in the browser to simulate a Ctrl+R
  force refresh (to send `If-Modified-Since` HTTP requests). Capture
  the `Performance.getEntriesByType("resource")` data again using the tag
  `reload`.
- Open the URL again to simulate a repeat visit (resources should come from
  browser cache). Capture the `Performance.getEntriesByType("resource")` data
  again using the tag `revisit`.

# Running

Start the [capture server](../src/capture-server/README.md).

Start Selenium. The tests require Selenium to be running.  This can either be
a local server, or something like [Sauce Labs](https://saucelabs.com).

Run the tests:

    node node_modules/intern/bin/intern-runner.js config=test/config/intern-functional

To take resource timings from a different URL, pass `urlToCaptureEntriesFor`
at the command line:

    node node_modules/intern/bin/intern-runner.js config=test/config/intern-functional urlToCaptureEntriesFor=http://www.example.com/the/page/

## Unit Tests

Use `intern-client.js` (not `intern-runner.js`) and `intern-base` (not
`intern-functional`).

    node node_modules/intern/bin/intern-client.js config=test/config/intern-base
