/* eslint-env amd */
define([
  "./intern-functional",
  "./env"
], function(config, env) {
  config.environments = [
    //env("chrome"),
    //env("firefox"),
    env("internet explorer")
  ];

  return config;
});
