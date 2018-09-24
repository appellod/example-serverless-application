const fs = require("fs");
const glob = require("glob");
const inline = require("inline-css");
const mkdirp = require("mkdirp");
const path = require("path");

const TEST_RESULT_DIRECTORY = "./.test-results";

mkdirp.sync(TEST_RESULT_DIRECTORY);

// Find all HTML files.
const files = glob.sync(`packages/**/.test-results/test-results.xml`);
files.forEach(async (file) => {
  const basename = path.basename(file);
  const package = file.split("/")[1];

  fs.copyFileSync(file, `${TEST_RESULT_DIRECTORY}/${package}-${basename}`);
});
