import { expect } from "chai";
import * as sinon from "sinon";

import { HttpContext, IFunctionRequest, Middleware } from "../../../../src/common/serverless";
import { FunctionRequestMock, HttpContextMock } from "../../../../src/common/serverless/mocks";

describe("common/serverless/lib/middleware.ts", function() {
  let ctx: HttpContext;
  let middleware: Middleware;
  let req: IFunctionRequest;

  beforeEach(function() {
    ctx = new HttpContextMock();
    middleware = new Middleware();
    req = new FunctionRequestMock();
  });

  describe("run()", function() {
    it("calls each middleware", async function() {
      const firstSpy = sinon.spy();
      middleware.use(async (c, r, next) => {
        firstSpy();
        await next();
      });

      const secondSpy = sinon.spy();
      middleware.use(async (c, r, next) => {
        secondSpy();
        await next();
      });

      await middleware.run(ctx, req);

      expect(firstSpy.calledOnce).to.eql(true);
      expect(secondSpy.calledOnce).to.eql(true);
    });
  });

  describe("use()", function() {
    it("adds the middleware layer", function() {
      middleware.use(async (c, r, next) => await next());

      expect(middleware["layers"].length).to.eql(1);
    });
  });
});
