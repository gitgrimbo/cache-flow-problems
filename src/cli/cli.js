var yargs = require("yargs");

// eslint-disable-next-line no-unused-expressions
yargs
  .command(require("./show-captures"))
  .command(require("./summarise-captures"))
  .help("help")
  .demand(1)
  .strict()
  .wrap(100)
  .argv;
