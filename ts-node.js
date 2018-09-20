const path = require("path");
const tsNode = require("ts-node");

tsNode.register({
  project: path.resolve(__dirname, "tsconfig.json"),
  typeCheck: true
});