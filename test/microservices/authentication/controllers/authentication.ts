import { Context } from "koa";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as jwt from "jsonwebtoken";
import * as nock from "nock";

import { User } from "../../../../src/common/postgres";
import { AuthenticationController } from "../../../../src/microservices/authentication/controllers";
import { UserMock } from "../../../common/postgres/mocks";

const authenticationController = new AuthenticationController();
const expect = chai.expect;

chai.use(chaiAsPromised);

describe("microservices/authentication/controllers/authentication.ts", function() {
  describe("checkAvailability()", function() {
    context("when email is available", function() {
      it("returns isAvailable set to true", async function() {
        const ctx = {
          query: {
            email: "available@example.com"
          }
        } as Context;

        await authenticationController.checkAvailability(ctx);

        expect(ctx.body.isAvailable).to.be.true;
      });
    });

    context("when email is unavailable", function() {
      beforeEach(async function() {
        await UserMock.insert({ email: "taken@example.com" });
      });

      it("returns isAvailable set to false", async function() {
        const ctx = {
          query: {
            email: "taken@example.com"
          }
        } as Context;

        await authenticationController.checkAvailability(ctx);

        expect(ctx.body.isAvailable).to.be.false;
      });
    });
  });

  describe("signup()", function() {
    it("returns the user", async function() {
      const ctx = {
        request: {
          body: {
            email: "user@example.com",
            password: "password"
          }
        }
      } as Context;

      await authenticationController.signup(ctx);

      expect(ctx.body.user).to.exist;
      expect(ctx.body.user.email).to.exist;
      expect(ctx.body.user.level).to.exist;
      expect(ctx.body.user.password).to.be.undefined;
      expect(ctx.body.user.reset_hash).to.be.undefined;
    });
  });

  describe("login()", function() {
    let user: User;

    beforeEach(async function() {
      user = await UserMock.insert({ password: "password" });
    });

    context("when credentials are correct", function() {
      it("returns the refresh token, token, and user", async function() {
        const ctx = {
          request: {
            body: {
              email: user.email,
              password: "password"
            }
          }
        } as Context;

        await authenticationController.login(ctx);

        expect(ctx.body.refreshToken).to.exist;
        expect(ctx.body.token).to.exist;
        expect(ctx.body.user).to.exist;
        expect(ctx.body.user.email).to.exist;
        expect(ctx.body.user.level).to.exist;
        expect(ctx.body.user.password).to.be.undefined;
        expect(ctx.body.user.reset_hash).to.be.undefined;
        expect(ctx.body.user.tokens).to.be.undefined;
      });
    });

    context("when credentials are incorrect", function() {
      it("returns an error message", function() {
        const ctx = {
          request: {
            body: {
              email: user.email,
              password: "wrong"
            }
          }
        } as Context;

        const promise = authenticationController.login(ctx);

        return expect(promise).to.be.rejectedWith("Incorrect username or password.");
      });
    });
  });

  describe("logout()", function() {
    let token: string;
    let user: User;

    beforeEach(async function() {
      user = await UserMock.insert();
      token = jwt.sign({ user }, process.env.JWT_SECRET);
    });

    it("returns a success message", async function() {
      const ctx = {
        headers: {
          authorization: `Bearer ${token}`
        },
        state: { user }
      } as Context;

      await authenticationController.logout(ctx);

      expect(ctx.body.message).to.exist;
    });
  });

  describe("refreshToken()", function() {
    let token: string;
    let user: User;

    beforeEach(async function() {
      user = await UserMock.insert();
      token = jwt.sign({ user }, process.env.JWT_SECRET);
    });

    it("returns the refresh token, token, and user", async function() {
      const ctx = {
        request: {
          body: { token }
        }
      } as Context;

      await authenticationController.refreshToken(ctx);

      expect(ctx.body.refreshToken).to.exist;
      expect(ctx.body.token).to.exist;
      expect(ctx.body.user).to.exist;
    });
  });

  describe("requestPasswordReset()", function() {
    let user: User;

    beforeEach(async function() {
      user = await UserMock.insert();

      nock(/mailgun\.net/)
        .post(/.*/)
        .reply(200, {
          id: "<20170422765241.92160.12345.951E2345@sandboxf70783234584b198234561d8029e646.mailgun.org>",
          message: "Queued. Thank you."
        });
    });

    it("returns a success message", async function() {
      const ctx = {
        request: {
          body: {
            email: user.email
          }
        }
      } as Context;

      await authenticationController.requestPasswordReset(ctx);

      expect(ctx.body.message).to.exist;
    });
  });

  describe("resetPassword()", function() {
    let user: User;

    beforeEach(async function() {
      user = await UserMock.insert();

      nock(/mailgun\.net/)
        .post(/.*/)
        .reply(200, {
          id: "<20170422765241.92160.12345.951E2345@sandboxf70783234584b198234561d8029e646.mailgun.org>",
          message: "Queued. Thank you."
        });

      user = await user.requestPasswordReset();
    });

    it("returns a success message", async function() {
      const ctx = {
        request: {
          body: {
            password: "newpassword",
            reset_hash: user.reset_hash
          }
        }
      } as Context;

      await authenticationController.resetPassword(ctx);

      expect(ctx.body.message).to.exist;
    });
  });
});
