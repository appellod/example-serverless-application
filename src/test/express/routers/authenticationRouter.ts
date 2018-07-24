import { expect } from "chai";
import * as nock from "nock";

import { User, UserDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper();

describe("express/routes/authenticationRouter.ts", function() {
  let user: UserDocument;

  beforeEach(async function() {
    user = await User.mock();
  });

  describe("GET /v1/authentication/availability", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/authentication/availability";
      const params = {
        email: "available@example.com"
      };

      const res = await apiHelper.request(method, path, params, null);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /v1/authentication/signup", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/authentication/signup";
      const params = {
        email: "user@example.com",
        password: "password"
      };

      const res = await apiHelper.request(method, path, params, null);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /v1/authentication/login", function() {
    beforeEach(async function() {
      user = await User.mock({ password: "password" });
    });

    it("returns a success response", async function() {
      const method = "post";
      const path = "/authentication/login";
      const params = {
        email: user.email,
        password: "password"
      };

      const res = await apiHelper.request(method, path, params, null);

      expect(res.status).to.eql(200);
    });
  });

  describe("DELETE /v1/authentication/logout", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/authentication/logout";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, user);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /v1/authentication/request-password-reset", function() {
    beforeEach(async function() {
      nock(/mailgun\.net/)
        .post(/.*/)
        .reply(200, {
          id: "<20170422765241.92160.12345.951E2345@sandboxf70783234584b198234561d8029e646.mailgun.org>",
          message: "Queued. Thank you."
        });
    });

    it("returns a success response", async function() {
      const method = "post";
      const path = "/authentication/request-password-reset";
      const params = {
        email: user.email
      };

      const res = await apiHelper.request(method, path, params, null);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /v1/authentication/reset-password", function() {
    beforeEach(async function() {
      nock(/mailgun\.net/)
        .post(/.*/)
        .reply(200, {
          id: "<20170422765241.92160.12345.951E2345@sandboxf70783234584b198234561d8029e646.mailgun.org>",
          message: "Queued. Thank you."
        });

      user = await user.requestPasswordReset();
    });

    it("returns a success response", async function() {
      const method = "post";
      const path = "/authentication/reset-password";
      const params = {
        password: "newpassword",
        resetHash: user.resetHash
      };

      const res = await apiHelper.request(method, path, params, user);

      expect(res.status).to.eq(200);
    });
  });
});
