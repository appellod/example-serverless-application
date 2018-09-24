import { expect } from "chai";
import * as sinon from "sinon";

import { Application, FunctionRequest, HttpContext,  } from "../src";
import { FunctionRequestMock, HttpContextMock } from "../src/mocks";

describe("application.ts", function() {
  let app: Application;
  let callback: (ctx: HttpContext, req: FunctionRequest) => Promise<void>;
  let ctx: HttpContext;
  let req: FunctionRequest;

  beforeEach(function() {
    app = new Application();
    callback = app.listen();
    ctx = new HttpContextMock();
    req = new FunctionRequestMock();
  });

  describe("listen()", function() {
    it("returns a function", function() {
      expect(typeof(callback)).to.eql("function");
    });

    describe("returned function", function() {
      it("sets the response status to 404", async function() {
        await callback(ctx, req);

        expect(ctx.res.status).to.eql(404);
      });

      it("runs middleware", async function() {
        const spy = sinon.spy();
        app.use(async (c, r, next) => {
          spy();
          await next();
        });

        await callback(ctx, req);

        expect(spy.calledOnce).to.eql(true);
      });
    });
  });

  describe("use()", function() {
    it("calls the middleware's use() function", function() {
      const spy = sinon.spy();
      app["middleware"].use = spy;

      app.use(async (c, r, next) => await next());

      expect(spy.calledOnce).to.eql(true);
    });
  });
});
