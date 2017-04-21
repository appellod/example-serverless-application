"use strict";

module.exports = (name, nameCamel) => {
  const data = `"use strict";

const chai = require('chai');

// set up test suite and import models
const bs = require("../bootstrap");
const ${name} = bs.mongoose.model("${name}");

const expect = chai.expect;

describe("models/${nameCamel}.js", () => {

});
`;

  return data;
};
