import { expect } from "chai";

import { request } from "../request";

describe("documentation/index.ts", function() {
  describe("GET /apidoc/index.html", function() {
    it("returns a redirect", async function() {
      const path = "/apidoc/index.html";

      const res = await request("get", path, null);

      expect(res).to.redirect;
    });
  });

  describe("GET /login.html", function() {
    it("returns a 200 status code", async function() {
      const path = "/login.html";

      const res = await request("get", path, null);

      expect(res.status).to.eql(200);
    });
  });
});
