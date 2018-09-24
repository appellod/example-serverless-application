import { expect } from "chai";
import * as sinon from "sinon";

import { start } from "../src/start";

describe("start.ts", function() {
  it("overrides console logs with Loggly logger", function() {
    const error = console.error;
    const info = console.info;
    const log = console.log;
    const warn = console.warn;

    const logger = start({
      inputToken: "example",
      subdomain: "example",
      tags: ["example"],
    });

    const spy = sinon.spy();
    logger.log = spy;

    console.log("Test");

    expect(spy.calledOnce).to.eql(true);

    console.error = error;
    console.info = info;
    console.log = log;
    console.warn = warn;
  });
});
