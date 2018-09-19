import { expect } from "chai";
import * as Chance from "chance";
import * as cookie from "cookie";

import { HttpContext, IFunctionRequest, MiddlewareLayer, session } from "../../../../src/common/serverless";

import { FunctionRequestMock, HttpContextMock, SessionStoreMock } from "../mocks";

const chance = new Chance();
const noop = async () => {};

describe("common/serverless/lib/session.ts", function() {
  let callback: MiddlewareLayer;
  let ctx: HttpContext;
  let data: string;
  let req: IFunctionRequest;
  let sid: string;
  let store: SessionStoreMock;

  beforeEach(function() {
    ctx = new HttpContextMock();
    data = chance.hash();
    req = new FunctionRequestMock();
    sid = chance.hash();
    store = new SessionStoreMock();

    callback = session({ store });
  });

  it("returns a middleware layer", function() {
    expect(typeof(callback)).to.eql("function");
  });

  describe("returned middleware layer", function() {
    it("gets the session by the session ID", async function() {
      req.headers = { cookie: cookie.serialize("sid", sid) };
      store.set({ data }, { sid });

      await callback(ctx, req, noop);

      expect(req.session.sid).to.eql(sid);
    });

    it("sets the session by the session ID", async function() {
      req.headers = { cookie: cookie.serialize("sid", sid) };

      await callback(ctx, req, noop);

      expect(store.sessions[sid]).to.exist;
    });

    context("when a cookie is provided", function() {
      it("does not send a set-cookie header", async function() {
        req.headers = { cookie: cookie.serialize("sid", sid) };

        await callback(ctx, req, noop);

        expect(ctx.res.headers["set-cookie"]).to.not.exist;
      });
    });

    context("when a cookie is not provided", function() {
      it("sends a set-cookie header with the session ID", async function() {
        await callback(ctx, req, noop);

        expect(ctx.res.headers["set-cookie"]).to.eql(cookie.serialize("sid", req.session.sid));
      });
    });
  });
});
