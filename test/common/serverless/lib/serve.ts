import { expect } from "chai";

import { HttpContext, IFunctionRequest, MiddlewareLayer, serve } from "../../../../src/common/serverless";

import { FunctionRequestMock, HttpContextMock,  } from "../mocks";

describe("common/serverless/lib/serve.ts", function() {
  let callback: MiddlewareLayer;
  let ctx: HttpContext;
  let req: IFunctionRequest;

  beforeEach(function() {
    callback = serve({ root: __dirname });
    ctx = new HttpContextMock();
    req = new FunctionRequestMock();
  });

  it("returns a middleware layer", function() {
    expect(typeof(callback)).to.eql("function");
  });

  describe("returned middleware layer", function() {
    context("when the file exists", function() {
      beforeEach(function() {
        req.originalUrl = "http://localhost/serve.ts";
      });

      it("returns the file data as the response body", async function() {
        await callback(ctx, req);

        expect(ctx.res.body.length).to.be.greaterThan(0);
      });

      it("sets the content-type header to file's mime type", async function() {
        await callback(ctx, req);

        // The .ts extension maps to video/mp2t in npm's mime library.
        // To save us from needing to create a stub file, we'll just accept that.
        expect(ctx.res.headers["content-type"]).to.eql("video/mp2t");
      });

      it("returns a 200 status code", async function() {
        await callback(ctx, req);

        expect(ctx.res.status).to.eql(200);
      });
    });

    context("when the file doesn't exist", function() {
      beforeEach(function() {
        req.originalUrl = "http://localhost/a-very-non-existant-file.ts";
      });

      it("returns a 404 status code", async function() {
        await callback(ctx, req);

        expect(ctx.res.status).to.eql(404);
      });
    });
  });
});
