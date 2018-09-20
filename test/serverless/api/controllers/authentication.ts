import * as chai from "chai";
import * as jwt from "jsonwebtoken";
import * as nock from "nock";

import { FunctionRequestMock, HttpContextMock } from "../../../../src/common/serverless/mocks";
import { User } from "../../../../src/common/postgres";
import { UserMock } from "../../../../src/common/postgres/mocks";
import * as controller from "../../../../src/serverless/api/controllers/authentication";

const expect = chai.expect;

describe("serverless/api/controllers/authentication.ts", function() {
  describe("checkAvailability()", function() {
    context("when email is available", function() {
      it("returns isAvailable set to true", async function() {
        const ctx = new HttpContextMock();
        const req = new FunctionRequestMock({
          query: {
            email: "available@example.com"
          }
        });

        await controller.checkAvailability(ctx, req);

        expect(ctx.res.body.isAvailable).to.be.true;
      });
    });

    context("when email is unavailable", function() {
      beforeEach(async function() {
        await new UserMock({ email: "taken@example.com" }).create();
      });

      it("returns isAvailable set to false", async function() {
        const ctx = new HttpContextMock();
        const req = new FunctionRequestMock({
          query: {
            email: "taken@example.com"
          }
        });

        await controller.checkAvailability(ctx, req);

        expect(ctx.res.body.isAvailable).to.be.false;
      });
    });
  });

  describe("loginWithCredentials()", function() {
    let user: User;

    beforeEach(async function() {
      user = await new UserMock({ password: "password" }).create();
    });

    context("when credentials are correct", function() {
      it("returns the refresh token, token, and user", async function() {
        const ctx = new HttpContextMock();
        const req = new FunctionRequestMock({
          body: {
            email: user.email,
            password: "password"
          }
        });

        await controller.loginWithCredentials(ctx, req);

        expect(ctx.res.body.refreshToken).to.exist;
        expect(ctx.res.body.token).to.exist;
        expect(ctx.res.body.user).to.exist;
        expect(ctx.res.body.user.email).to.exist;
        expect(ctx.res.body.user.level).to.exist;
        expect(ctx.res.body.user.password).to.be.undefined;
        expect(ctx.res.body.user.reset_hash).to.be.undefined;
        expect(ctx.res.body.user.tokens).to.be.undefined;
      });
    });

    context("when credentials are incorrect", function() {
      it("returns an error message", function() {
        const ctx = new HttpContextMock();
        const req = new FunctionRequestMock({
          body: {
            email: user.email,
            password: "wrong"
          }
        });

        const promise = controller.loginWithCredentials(ctx, req);

        return expect(promise).to.be.rejectedWith("Incorrect username or password.");
      });
    });
  });

  describe("loginWithRefreshToken()", function() {
    let token: string;
    let user: User;

    beforeEach(async function() {
      user = await new UserMock().create();
      token = jwt.sign({ user }, process.env.JWT_SECRET);
    });

    it("returns the refresh token, token, and user", async function() {
      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        body: { token }
      });

      await controller.loginWithRefreshToken(ctx, req);

      expect(ctx.res.body.refreshToken).to.exist;
      expect(ctx.res.body.token).to.exist;
      expect(ctx.res.body.user).to.exist;
    });
  });

  describe("logout()", function() {
    let token: string;
    let user: User;

    beforeEach(async function() {
      user = await new UserMock().create();
      token = jwt.sign({ user }, process.env.JWT_SECRET);
    });

    it("returns a success message", async function() {
      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        body: {
          email: user.email,
          password: "wrong"
        },
        headers: {
          authorization: `Bearer ${token}`
        },
        user
      });

      await controller.logout(ctx, req);

      expect(ctx.res.body.message).to.exist;
    });
  });

  describe("requestPasswordReset()", function() {
    let user: User;

    beforeEach(async function() {
      user = await new UserMock().create();

      nock(/mailgun\.net/)
        .post(/.*/)
        .reply(200, {
          id: "<20170422765241.92160.12345.951E2345@sandboxf70783234584b198234561d8029e646.mailgun.org>",
          message: "Queued. Thank you."
        });
    });

    it("returns a success message", async function() {
      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        body: {
          email: user.email
        }
      });

      await controller.requestPasswordReset(ctx, req);

      expect(ctx.res.body.message).to.exist;
    });
  });

  describe("resetPassword()", function() {
    let user: User;

    beforeEach(async function() {
      user = await new UserMock().create();

      nock(/mailgun\.net/)
        .post(/.*/)
        .reply(200, {
          id: "<20170422765241.92160.12345.951E2345@sandboxf70783234584b198234561d8029e646.mailgun.org>",
          message: "Queued. Thank you."
        });

      user = await user.requestPasswordReset();
    });

    it("returns a success message", async function() {
      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        body: {
          password: "newpassword",
          resetHash: user.reset_hash
        }
      });

      await controller.resetPassword(ctx, req);

      expect(ctx.res.body.message).to.exist;
    });
  });

  describe("signup()", function() {
    it("returns the user", async function() {
      const ctx = new HttpContextMock();
      const req = new FunctionRequestMock({
        body: {
          email: "user@example.com",
          password: "password"
        }
      });

      await controller.signup(ctx, req);

      expect(ctx.res.body.user).to.exist;
      expect(ctx.res.body.user.email).to.exist;
      expect(ctx.res.body.user.level).to.exist;
      expect(ctx.res.body.user.password).to.be.undefined;
      expect(ctx.res.body.user.reset_hash).to.be.undefined;
    });
  });
});
