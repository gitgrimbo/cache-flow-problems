/* eslint-env amd */
define([
  "intern",
  "intern/dojo/node!fs",
  "intern/dojo/node!path",
  "intern/dojo/node!https",
  "intern/dojo/node!request-promise"
], function(intern, fs, path, https, rp) {
  const clientScriptSourcePath = path.resolve("./dist/client.js");
  const clientScriptSource = String(fs.readFileSync(clientScriptSourcePath));
  if (!clientScriptSource) {
    throw new Error("Client source was not found at " + clientScriptSourcePath);
  }

  function thenLog() {
    const args = [].slice.apply(arguments);
    return function(it) {
      console.log.apply(console, args);
      // pass on the value
      return it;
    };
  }

  class CollectionServer {
    constructor(agent, endpointUrl) {
      this.agent = agent;
      this.endpointUrl = endpointUrl;
    }

    postResources(data) {
      const opts = {
        method: "POST",
        url: this.endpointUrl,
        agent: this.agent,
        body: data,
        json: true
      };
      return rp(opts);
    }

    getTestId() {
      const opts = {
        method: "GET",
        url: this.endpointUrl,
        agent: this.agent,
        json: true
      };
      return rp(opts);
    }
  }

  function createAgent(cacheFlowProblems) {
    const agentOptions = {
      host: cacheFlowProblems.host,
      port: cacheFlowProblems.port,
      path: cacheFlowProblems.resourcesPath,
      rejectUnauthorized: false
    };
    return new https.Agent(agentOptions);
  }

  class ResourcesCollector {
    constructor(config) {
      this.config = config;
      this.resourcesId = null;

      const endpointUrl = config.cacheFlowProblems.origin + config.cacheFlowProblems.resourcesPath;
      this.collectionServer = new CollectionServer(createAgent(config.cacheFlowProblems), endpointUrl);
    }

    startTest() {
      const self = this;
      return function() {
        return self.collectionServer.getTestId()
          .then(data => {
            self.resourcesId = data.resourcesId;
            return data;
          });
      };
    }

    collectResources(session, tag) {
      const self = this;
      const cacheFlowProblems = this.config.cacheFlowProblems;
      const resourcesId = this.resourcesId;
      return function() {
        return this.parent
          .execute(function(clientScriptSource) {
            // eslint-disable-next-line no-eval
            eval(clientScriptSource);
            return true;
          }, [clientScriptSource])
          .then(thenLog("collectResources: after eval"))
          .execute(function(cacheFlowProblemsOrigin, session, tag) {
            // After the eval() above, "cott"" is now a global in the browser.
            const resources = cacheFlowProblems.getResources();
            const data = cacheFlowProblems.makePostData(cacheFlowProblemsOrigin, resources, session, tag);
            return data;
          }, [cacheFlowProblems.origin, session, tag])
          .then(thenLog("collectResources: after makePostData"))
          .then(data => {
            data.resourcesId = resourcesId;
            return data;
          })
          .then(data => self.collectionServer.postResources(data))
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
            // eslint-disable-next-line no-undef
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
