/* eslint-env amd */
define([
  "./intern-functional",
  "./env"
], function(config, env) {
  config.environments = [
    env("chrome"),
    env("firefox", "45"),
    env("firefox", "46"),
    env("internet explorer", "9"),
    env("internet explorer", "10"),
    env("internet explorer", "11")
  ];

  return config;
});
