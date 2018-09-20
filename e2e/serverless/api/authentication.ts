import { expect } from "chai";
import * as jwt from "jsonwebtoken";
import * as nock from "nock";

import { User } from "../../../src/common/postgres";
import { UserMock } from "../../../src/common/postgres/mocks";

import { RequestHelper } from "../../request-helper";

const requestHelper = new RequestHelper();

describe("/authentication", function() {
  let user: User;

  beforeEach(async function() {
    user = await new UserMock().create();
  });

  afterEach(async function() {
    await user.$query().deleteById(user.id);
  });

  describe("DELETE /logout", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/authentication/logout";
      const params: any = null;

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /check-availability", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/authentication/check-availability";
      const params = {
        email: "available@example.com"
      };

      const res = await requestHelper.request(method, path, params);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /login", function() {
    beforeEach(async function() {
      user = await new UserMock({ password: "password" }).create();
    });

    it("returns a success response", async function() {
      const method = "post";
      const path = "/authentication/login";
      const params = {
        email: user.email,
        password: "password"
      };

      const res = await requestHelper.request(method, path, params);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /refresh-token", function() {
    let token: string;

    beforeEach(async function() {
      token = jwt.sign({ user }, process.env.JWT_SECRET);
    });

    it("returns a success response", async function() {
      const method = "post";
      const path = "/authentication/refresh-token";
      const params = { token };

      const res = await requestHelper.request(method, path, params);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /request-password-reset", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/authentication/request-password-reset";
      const params = {
        email: user.email
      };

      const res = await requestHelper.request(method, path, params);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /reset-password", function() {
    beforeEach(async function() {
      nock(/mailgun\.net/)
        .post(/.*/)
        .reply(200, {
          id: "<20170422765241.92160.12345.951E2345@sandboxf12345678901b198234561d8029e646.mailgun.org>",
          message: "Queued. Thank you."
        });

      user = await user.requestPasswordReset();
    });

    it("returns a success response", async function() {
      const method = "post";
      const path = "/authentication/reset-password";
      const params = {
        password: "newpassword",
        resetHash: user.reset_hash
      };

      const res = await requestHelper.request(method, path, params);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /signup", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/authentication/signup";
      const params = {
        email: "user@example.com",
        password: "password"
      };

      const res = await requestHelper.request(method, path, params);

      expect(res.status).to.eql(200);
    });
  });
});
