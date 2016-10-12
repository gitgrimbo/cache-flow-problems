/* eslint-env amd */
define([
  "intern/dojo/has",
  "./intern-functional",
  "./env",
  "intern/dojo/has!host-node?./server-manager"
], function(has, config, env, ServerManager) {
  config.environments = [
    env("chrome"),
    env("firefox", "45"),
    env("firefox", "46"),
    env("internet explorer", "9"),
    env("internet explorer", "10"),
    env("internet explorer", "11")
  ];

  if (has("host-node")) {
    new ServerManager().handleStartAndStop(config);
  }

  return config;
});
