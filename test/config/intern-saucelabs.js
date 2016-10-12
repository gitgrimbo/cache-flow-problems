/* eslint-env amd */
define([
  "intern/dojo/has",
  "./intern-functional",
  "./env",
  "intern/dojo/has!host-node?./server-manager"
], function(has, config, env, ServerManager) {
  // iOS Safari doesn't support resource timing API.
  // http://caniuse.com/#feat=resource-timing
  var iPadOnIOS9 = {
    browserName: "Safari",
    appiumVersion: "1.5.3",
    deviceName: "iPad 2",
    deviceOrientation: "portrait",
    platformVersion: "9.3",
    platformName: "iOS",
    fixSessionCapabilities: false
  };

  config.defaultTimeout = 10 * 60 * 1000;
  config.cacheFlowProblems.findTimeout = 10 * 60 * 1000;
  config.cacheFlowProblems.asyncTimeout = 10 * 60 * 1000;

  // Use SauceLabs.
  config.tunnel = "SauceLabsTunnel";

  config.tunnelOptions = {
    port: 4445
  };

  config.maxConcurrency = 1;

  config.environments = [
    //env("chrome", ["53", "52"], ["Windows 7", "OS X 10.11"]),
    //env("firefox", ["48", "47"], ["Windows 7", "OS X 10.11"]),
    //env("internet explorer", ["11", "10", "9"]),
    // 12 and 14 not supported by SauceLabs
    //env("MicrosoftEdge", ["13"]),
    //env("chrome", ["37"], "Windows 7"),
    //env("firefox", ["31"], "Windows 7"),
    env("safari", ["9", "8"]),
    //iPadOnIOS9
  ];

  if (has("host-node")) {
    new ServerManager().handleStartAndStop(config);
  }

  return config;
});
