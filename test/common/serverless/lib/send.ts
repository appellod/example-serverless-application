import { expect } from "chai";

import { HttpContext, send } from "../../../../src/common/serverless";
import { HttpContextMock } from "../../../../src/common/serverless/mocks";

describe("common/serverless/lib/send.ts", function() {
  let ctx: HttpContext;

  beforeEach(function() {
    ctx = new HttpContextMock();
  });

  context("when the file exists", function() {
    it("returns the file data as the response body", async function() {
      await send(ctx, "send.ts", { root: __dirname });

      expect(ctx.res.body.length).to.be.greaterThan(0);
    });

    it("sets the content-type header to file's mime type", async function() {
      await send(ctx, "send.ts", { root: __dirname });

      // The .ts extension maps to video/mp2t in npm's mime library.
      // To save us from needing to create a stub file, we'll just accept that.
      expect(ctx.res.headers["content-type"]).to.eql("video/mp2t");
    });

    it("returns a 200 status code", async function() {
      await send(ctx, "send.ts", { root: __dirname });

      expect(ctx.res.status).to.eql(200);
    });
  });

  context("when the file doesn't exist", function() {
    it("returns a 404 status code", async function() {
      await send(ctx, "a completely non-existant file", { root: __dirname });

      expect(ctx.res.status).to.eql(404);
    });
  });
});
