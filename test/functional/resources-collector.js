/* eslint-env amd */
define([
  "intern",
  "intern/dojo/node!fs",
  "intern/dojo/node!path",
  "intern/dojo/node!https",
  "intern/dojo/node!request-promise"
], function(intern, fs, path, https, rp) {
  var config = intern.config;
  var cacheFlowProblems = config.cacheFlowProblems;

  var clientScriptSourcePath = path.resolve("./dist/client.js");
  var clientScriptSource = String(fs.readFileSync(clientScriptSourcePath));
  if (!clientScriptSource) {
    throw new Error("Client source was not found at " + clientScriptSourcePath);
  }

  var agentOptions = {
    host: cacheFlowProblems.host,
    port: cacheFlowProblems.port,
    path: cacheFlowProblems.resourcesPath,
    rejectUnauthorized: false
  };

  var agent = new https.Agent(agentOptions);

  function thenLog() {
    var args = [].slice.apply(arguments);
    return function(it) {
      console.log.apply(console, args);
      // pass on the value
      return it;
    };
  }

  function postResourcesToCollectionServer(data) {
    return rp({
      method: "POST",
      url: cacheFlowProblems.origin + cacheFlowProblems.resourcesPath,
      agent: agent,
      body: data,
      json: true
    });
  }

  function getTestIdFromCollectionServer() {
    return rp({
      method: "GET",
      url: cacheFlowProblems.origin + cacheFlowProblems.resourcesPath,
      agent: agent,
      json: true
    });
  }

  class ResourcesCollector {
    constructor() {
      this.resourcesId = null;
    }

    startTest() {
      const self = this;
      return function() {
        return getTestIdFromCollectionServer()
          .then(data => {
            self.resourcesId = data.resourcesId;
            return data;
          });
      };
    }

    collectResources(session, tag) {
      const resourcesId = this.resourcesId;
      return function() {
        return this.parent
          .execute(function(clientScriptSource) {
            eval(clientScriptSource);
            return true;
          }, [clientScriptSource])
          .then(thenLog("collectResources: after eval"))
          .execute(function(cacheFlowProblemsOrigin, session, tag) {
            // After the eval() above, "cott"" is now a global in the browser.
            var resources = cacheFlowProblems.getResources();
            var data = cacheFlowProblems.makePostData(cacheFlowProblemsOrigin, resources, session, tag);
            return data;
          }, [cacheFlowProblems.origin, session, tag])
          .then(thenLog("collectResources: after makePostData"))
          .then(data => {
            data.resourcesId = resourcesId;
            return data;
          })
          .then(postResourcesToCollectionServer)
          .then(thenLog("collectResources: after post"));
      };
    }

    getUrlAndCollectResources(url, session, tag) {
      const self = this;
      return function() {
        return this.parent
          .get(url)
          .then(self.collectResources(session, tag));
      };
    }

    reloadAndCollectResources(session, tag) {
      const self = this;
      return function() {
        return this.parent
          .execute(function() {
            window.location.reload(true);
            return true;
          })
          // IE needs a definite pause after reload  before we can interact with the 'new' page.
          .sleep(500)
          .then(self.collectResources(session, tag));
      };
    }
  }

  return ResourcesCollector;
});
