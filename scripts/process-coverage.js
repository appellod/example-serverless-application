const fs = require("fs");
const glob = require("glob");
const inline = require("inline-css");
const mkdirp = require("mkdirp");
const path = require("path");

const CODE_COVERAGE_DIRECTORY = "./.test-results/coverage/";
const CODE_COVERAGE_VSTS_DIRECTORY = "./.test-results/coverage-vsts/";

// Create VSTS directory if it does not exist.
if (!fs.existsSync(CODE_COVERAGE_VSTS_DIRECTORY)) {
  fs.mkdirSync(CODE_COVERAGE_VSTS_DIRECTORY);
}

// Find all HTML files.
const files = glob.sync(`${CODE_COVERAGE_DIRECTORY}/**/*.html`);
files.forEach(async (file) => {
  file = file.replace(CODE_COVERAGE_DIRECTORY, "");

  const filePath = path.resolve(CODE_COVERAGE_DIRECTORY, file);
  let options = {
    url: "file://" + filePath,
    extraCss: `
      div.clearfix {
          overflow: hidden;
          width: 100%;
      }

      div.footer {
        display: none;
      }

      div.status-line {
        margin: 0px 10px;
      }

      p.quiet {
        display: none;
      }

      td.line-count a { font-size: 12px; }
      td.line-count a:not([name]) { display: block; }
      td.line-coverage { font-size: 12px; width: 1px; }
    `
  };

  // Inline all CSS to HTML file.
  const data = fs.readFileSync(filePath).toString();
  const html = await inline(data, options);

  // Save new HTML file.
  const outputFile = path.resolve(CODE_COVERAGE_VSTS_DIRECTORY, file);
  const dirname = path.dirname(outputFile);

  // Create directory if it does not exist.
  mkdirp.sync(dirname);

  fs.writeFileSync(outputFile, html);
});
