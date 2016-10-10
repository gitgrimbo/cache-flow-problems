/* eslint-env amd */
define([
  "intern/dojo/lang",
  "./intern-functional",
  "./env"
], function(lang, config, env) {
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

  config = lang.assign({}, config, {
    // Use SauceLabs.
    tunnel: "SauceLabsTunnel",
    tunnelOptions: {
      port: 4445,
      directDomains: ["*.github.io"]
    },

    maxConcurrency: 1,

    environments: [
      //env("chrome", ["51", "50"], ["Windows 7", "OS X 10.11"]),
      //env("firefox", ["47", "46"], ["Windows 7", "OS X 10.11"]),
      //env("internet explorer", ["11", "10", "9"]),
      //env("MicrosoftEdge", ["13"]),
      //env("chrome", ["37"], "Windows 7"),
      //env("firefox", ["31"], "Windows 7"),
      //env("safari", ["9", "8"]),
      //iPadOnIOS9
    ],
  });

  config.environments = (function(min, max) {
    var envs = [];
    for (var i = min; i < max; i++) {
      envs.push(env("firefox", "" + i, "Windows 7"));
    }
    return envs;
  })(31, 47);
  console.log(config.environments);

  return config;
});
