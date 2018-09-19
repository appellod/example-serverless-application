import { expect } from "chai";
import * as sinon from "sinon";

import { HttpContext, IFunctionRequest, Middleware, Router } from "../../../../src/common/serverless";

import { FunctionRequestMock, HttpContextMock,  } from "../mocks";

describe("common/serverless/lib/router.ts", function() {
  let ctx: HttpContext;
  let req: IFunctionRequest;
  let router: Router;

  beforeEach(function() {
    ctx = new HttpContextMock();
    req = new FunctionRequestMock();
    router = new Router();
  });

  describe("delete()", function() {
    it("calls router.route()", function() {
      const spy = sinon.spy();
      router["route"] = spy;

      router.delete("/");

      expect(spy.calledOnce).to.eql(true);
    });
  });

  describe("get()", function() {
    it("adds a middleware layer for the route", function() {
      const spy = sinon.spy();
      router["route"] = spy;

      router.get("/");

      expect(spy.calledOnce).to.eql(true);
    });
  });

  describe("match()", function() {
    context("when the request matches the route", function() {
      it("returns true", function() {
        req.method = "GET";
        req.originalUrl = "http://localhost/matching/path";

        const result = router["match"]("GET", "/matching/path", req);

        expect(result).to.eql(true);
      });
    });

    context("when the request matches the route", function() {
      it("returns false", function() {
        req.method = "GET";
        req.originalUrl = "http://localhost/not/matching/path";

        const result = router["match"]("GET", "/matching/path", req);

        expect(result).to.eql(false);
      });
    });
  });

  describe("params()", function() {
    context("when there are no variables in the path", function() {
      it("returns an empty object", function() {
        const result = router["params"]("/no/params", "http://localhost/no/params");

        expect(result).to.eql({});
      });
    });

    context("when there are variables in the path", function() {
      it("returns an object with the names params", function() {
        const result = router["params"]("/:first/:second", "http://localhost/1/2");

        expect(result).to.eql({ first: "1", second: "2" });
      });
    });
  });

  describe("pathToRegExp()", function() {
    it("converts params to alphanumeric wildcards", function() {
      const regex = router["pathToRegExp"]("/users/:id");

      expect(regex).to.eql(/^\/users\/(\w+)$/);
    });
  });

  describe("post()", function() {
    it("adds a middleware layer for the route", function() {
      const spy = sinon.spy();
      router["route"] = spy;

      router.post("/");

      expect(spy.calledOnce).to.eql(true);
    });
  });

  describe("put()", function() {
    it("adds a middleware layer for the route", function() {
      const spy = sinon.spy();
      router["route"] = spy;

      router.put("/");

      expect(spy.calledOnce).to.eql(true);
    });
  });

  describe("route()", function() {
    let spy: sinon.SinonSpy;

    beforeEach(function() {
      spy = sinon.spy();
      router["route"]("GET", "/matching/route", (c, r, next) => spy());
    });

    it("adds a middleware layer for the route", function() {
      expect(router.routes().length).to.eql(1);
    });

    context("when a request matches the route", function() {
      it("runs the route's middleware", async function() {
        req.method = "GET";
        req.originalUrl = "http://localhost/matching/route";

        await new Middleware(router.routes()).run(ctx, req);

        expect(spy.calledOnce).to.eql(true);
      });
    });

    context("when a request matches the route", function() {
      it("runs the route's middleware", async function() {
        req.method = "GET";
        req.originalUrl = "http://localhost/mismatching/route";

        await new Middleware(router.routes()).run(ctx, req);

        expect(spy.called).to.eql(false);
      });
    });
  });

  describe("use()", function() {
    it("adds a middleware layer for the route", function() {
      router.use(async (c, r, next) => await next());
      router.use(async (c, r, next) => await next());

      expect(router.routes().length).to.eql(2);
    });
  });
});
