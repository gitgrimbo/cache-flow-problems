/* eslint-env amd */
define([
  "intern",
  "intern!object",
  "./resources-collector"
], function(intern, registerSuite, ResourcesCollector) {
  var config = intern.config;

  registerSuite({
    name: "functional",

    test() {
      var cacheFlowProblems = config.cacheFlowProblems;
      var url = config.urlToCaptureEntriesFor;
      var session = this.remote.session.sessionId;

      var resourcesCollector = new ResourcesCollector();
      return this.remote
        .setFindTimeout(cacheFlowProblems.findTimeout)
        .setExecuteAsyncTimeout(cacheFlowProblems.asyncTimeout)
        .then(resourcesCollector.startTest())
        .then(resourcesCollector.getUrlAndCollectResources(url, session, "first"))
        .then(resourcesCollector.reloadAndCollectResources(session, "reload"))
        .then(resourcesCollector.getUrlAndCollectResources(url, session, "revisit"));
    }
  });
});
