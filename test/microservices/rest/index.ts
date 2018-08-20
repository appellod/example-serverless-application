import { expect } from "chai";

import { koa } from "../../../src/microservices/rest";
import { RequestHelper } from "../../request-helper";

const requestHelper = new RequestHelper(koa.server);

describe("microservices/rest/index.ts", function() {
  describe("documentation", function() {
    describe("GET /apidoc/index.html", function() {
      it("returns a redirect", async function() {
        const res = await requestHelper.request("get", "/apidoc/index.html", null);

        expect(res).to.redirect;
      });
    });

    describe("GET /login.html", function() {
      it("returns a 200 status code", async function() {
        const res = await requestHelper.request("get", "/login.html", null);

        expect(res.status).to.eql(200);
      });
    });
  });
});
