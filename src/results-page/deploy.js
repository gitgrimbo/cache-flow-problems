/* eslint-env node, shelljs */
const fs = require("fs");
const path = require("path");
require("shelljs/global");
const generate = require("./generate");

function generateIndexHtml() {
  const resultsPath = "./results/";
  const filename = path.resolve(__dirname, "index.html");
  return generate(filename, resultsPath);
}

const ghTemp = "./temp/gh-pages";
const repo = require("../../package.json").repository.url;

set("+v");

if (!which("git")) {
  echo("git is required");
  exit(1);
}

rm("-rf", ghTemp);

// git clone will also create the ghTemp folder
exec("git clone " + repo + " --branch gh-pages --single-branch " + ghTemp);

generateIndexHtml()
  .then(html => {
    fs.writeFileSync(path.resolve(ghTemp, "index.html"), html);

    cd(ghTemp);

    exec("git add .");
    exec("git commit --amend --no-edit");
    exec("git push -f origin gh-pages");
  })
  .catch(err => console.error(err));
