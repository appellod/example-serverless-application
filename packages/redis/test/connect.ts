import { expect } from "chai";

import { connect } from "../src/connect";

describe("connect.ts", function() {
  it("connects to Redis", function() {
    const redis = connect({
      database: Number(process.env.REDIS_DATABASE),
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
      port: Number(process.env.REDIS_PORT),
      tls: process.env.REDIS_TLS === "true"
    });

    expect(redis).to.exist;
  });
});
