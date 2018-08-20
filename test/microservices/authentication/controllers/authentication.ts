import { Context } from "koa";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as nock from "nock";

import { TokenDocument, User, UserDocument } from "../../../../src/common/mongo";
import { AuthenticationController } from "../../../../src/microservices/authentication/controllers";

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
        await User.mock({ email: "taken@example.com" });
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
    it("returns the user and access token", async function() {
      const ctx = {
        request: {
          body: {
            email: "user@example.com",
            password: "password"
          }
        }
      } as Context;

      await authenticationController.signup(ctx);

      expect(ctx.body.token).to.exist;
      expect(ctx.body.user).to.exist;
      expect(ctx.body.user.email).to.exist;
      expect(ctx.body.user.level).to.exist;
      expect(ctx.body.user.password).to.be.undefined;
      expect(ctx.body.user.resetHash).to.be.undefined;
      expect(ctx.body.user.tokens).to.be.undefined;
    });
  });

  describe("login()", function() {
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock({ password: "password" });
    });

    context("when credentials are correct", function() {
      it("returns the user and access token", async function() {
        const ctx = {
          request: {
            body: {
              email: user.email,
              password: "password"
            }
          }
        } as Context;

        await authenticationController.login(ctx);

        expect(ctx.body.token).to.exist;
        expect(ctx.body.user).to.exist;
        expect(ctx.body.user.email).to.exist;
        expect(ctx.body.user.level).to.exist;
        expect(ctx.body.user.password).to.be.undefined;
        expect(ctx.body.user.resetHash).to.be.undefined;
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
    let token: TokenDocument;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
      ({ token, user } = await user.login());
    });

    it("returns a success message", async function() {
      const ctx = {
        headers: {
          authorization: `Bearer ${token._id}`
        },
        state: { user }
      } as Context;

      await authenticationController.logout(ctx);

      expect(ctx.body.message).to.exist;
    });
  });

  describe("requestPasswordReset()", function() {
    let token: TokenDocument;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
      ({ token, user } = await user.login());

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
    let token: TokenDocument;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
      ({ token, user } = await user.login());

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
            resetHash: user.resetHash
          }
        }
      } as Context;

      await authenticationController.resetPassword(ctx);

      expect(ctx.body.message).to.exist;
    });
  });

  describe("validateToken()", function() {
    let token: TokenDocument;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
      ({ token, user } = await user.login());
    });

    it("returns the user", async function() {
      const ctx = {
        query: { token }
      } as Context;

      await authenticationController.validateToken(ctx);

      expect(ctx.body.user).to.exist;
    });
  });
});
