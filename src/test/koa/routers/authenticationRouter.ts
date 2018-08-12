import { expect } from "chai";
import * as nock from "nock";

import { TokenDocument, User, UserDocument } from "../../../mongoose";
import { request } from "../../request";

describe("koa/routes/authenticationRouter.ts", function() {
  let user: UserDocument;

  beforeEach(async function() {
    user = await User.mock();
  });

  describe("GET /v1/authentication/availability", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/v1/authentication/availability";
      const params = {
        email: "available@example.com"
      };

      const res = await request(method, path, params, null);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /v1/authentication/signup", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/v1/authentication/signup";
      const params = {
        email: "user@example.com",
        password: "password"
      };

      const res = await request(method, path, params, null);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /v1/authentication/login", function() {
    beforeEach(async function() {
      user = await User.mock({ password: "password" });
    });

    it("returns a success response", async function() {
      const method = "post";
      const path = "/v1/authentication/login";
      const params = {
        email: user.email,
        password: "password"
      };

      const res = await request(method, path, params, null);

      expect(res.status).to.eql(200);
    });
  });

  describe("DELETE /v1/authentication/logout", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/v1/authentication/logout";
      const params: any = null;

      const res = await request(method, path, params, user);

      expect(res.status).to.eql(200);
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
      const path = "/v1/authentication/request-password-reset";
      const params = {
        email: user.email
      };

      const res = await request(method, path, params, null);

      expect(res.status).to.eql(200);
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
      const path = "/v1/authentication/reset-password";
      const params = {
        password: "newpassword",
        resetHash: user.resetHash
      };

      const res = await request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /authentication/validate-token", function() {
    let token: TokenDocument;

    beforeEach(async function() {
      ({ token, user } = await user.login());
    });

    it("returns a success response", async function() {
      const method = "get";
      const path = "/v1/authentication/validate-token";
      const params = { token: token._id };

      const res = await request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });
});
