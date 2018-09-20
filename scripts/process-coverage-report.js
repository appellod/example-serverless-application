const fs = require("fs");
const inline = require("inline-css");
const path = require("path");

const CODE_COVERAGE_DIRECTORY = "./.test-results/coverage";
const CODE_COVERAGE_VSTS_DIRECTORY = "./.test-results/coverage-vsts";

// Create VSTS directory if it does not exist.
if (!fs.existsSync(CODE_COVERAGE_VSTS_DIRECTORY)) {
  fs.mkdirSync(CODE_COVERAGE_VSTS_DIRECTORY);
}

// Find all HTML files.
const files = fs.readdirSync(CODE_COVERAGE_DIRECTORY);
const reports = files.filter((file) => file.endsWith(".html"));

reports.forEach(async (report) => {
  let filePath = path.join(CODE_COVERAGE_DIRECTORY, report);
  let options = {
    url: "file://" + path.resolve(filePath),
    extraCss: `
      div.clearfix {
          overflow: hidden;
          width: 100%;
      }

      td.line-count a:not([name]) { display: block; }
      td.line-coverage { width: 1px; }
    `
  };

  // Inline all CSS to HTML file.
  const data = fs.readFileSync(path.resolve(filePath)).toString();
  const html = await inline(data, options);

  // Save new HTML file.
  const outputFile = path.join(CODE_COVERAGE_VSTS_DIRECTORY, report);
  fs.writeFileSync(outputFile, html);
});
