import { expect } from "chai";
import * as express from "express";
import * as nock from "nock";

import { AuthenticationController } from "../../../express";
import { TokenDocument, User, UserDocument } from "../../../mongoose";

const index = require("../../");

const authenticationController = new AuthenticationController();

describe("express/controllers/authenticationController.ts", function() {
  describe("checkAvailability()", function() {
    context("when email is available", function() {
      it("returns isAvailable set to true", async function() {
        const req = {
          query: {
            email: "available@example.com"
          }
        } as express.Request;

        const res = await authenticationController.checkAvailability(req);

        expect(res.isAvailable).to.be.true;
      });
    });

    context("when email is unavailable", function() {
      beforeEach(async function() {
        await User.mock({ email: "taken@example.com" });
      });

      it("returns isAvailable set to false", async function() {
        const req = {
          query: {
            email: "taken@example.com"
          }
        } as express.Request;

        const res = await authenticationController.checkAvailability(req);

        expect(res.isAvailable).to.be.false;
      });
    });
  });

  describe("signup()", function() {
    it("returns the user and access token", async function() {
      const req = {
        body: {
          email: "user@example.com",
          password: "password"
        }
      } as express.Request;

      const res = await authenticationController.signup(req);

      expect(res.token).to.exist;
      expect(res.user).to.exist;
      expect(res.user.email).to.exist;
      expect(res.user.level).to.exist;
      expect(res.user.password).to.be.undefined;
      expect(res.user.resetHash).to.be.undefined;
      expect(res.user.tokens).to.be.undefined;
    });
  });

  describe("login()", function() {
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock({ password: "password" });
    });

    context("when credentials are correct", function() {
      it("returns the user and access token", async function() {
        const req = {
          body: {
            email: user.email,
            password: "password"
          }
        } as express.Request;

        const res = await authenticationController.login(req);

        expect(res.token).to.exist;
        expect(res.user).to.exist;
        expect(res.user.email).to.exist;
        expect(res.user.level).to.exist;
        expect(res.user.password).to.be.undefined;
        expect(res.user.resetHash).to.be.undefined;
        expect(res.user.tokens).to.be.undefined;
      });
    });

    context("when credentials are incorrect", function() {
      it("returns an error message", async function() {
        const req = {
          body: {
            email: user.email,
            password: "wrong"
          }
        } as express.Request;

        try {
          const res = await authenticationController.login(req);
        } catch (e) {
          expect(e.message).to.eql("Incorrect username or password.");
          return;
        }

        throw new Error("Error should have been thrown.");
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
      const req = {} as express.Request;
      req.headers = {};
      req.headers.authorization = "Bearer " + token._id;
      req.user = user;

      const res = await authenticationController.logout(req);

      expect(res.message).to.exist;
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
      const req = {
        body: {
          email: user.email
        }
      } as express.Request;

      const res = await authenticationController.requestPasswordReset(req);

      expect(res.message).to.exist;
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
      const req = {
        body: {
          password: "newpassword",
          resetHash: user.resetHash
        }
      } as express.Request;

      const res = await authenticationController.resetPassword(req);

      expect(res.message).to.exist;
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
      const req = {
        query: { token }
      } as express.Request;

      const res = await authenticationController.validateToken(req);

      expect(res.user).to.exist;
    });
  });
});
