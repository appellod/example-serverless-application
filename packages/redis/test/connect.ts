import { expect } from "chai";

import { connect } from "../src/connect";

describe("connect.ts", function() {
  it("connects to Redis", function() {
    const redis = connect({
      database: process.env.REDIS_DATABASE,
      url: process.env.REDIS_URL
    });

    expect(redis).to.exist;
  });
});
