require("./server")
  .startServers({ httpPort: 8082 })
  .then(handle => {
    console.log("Servers started");
  }, err => {
    console.error(err);
  });
