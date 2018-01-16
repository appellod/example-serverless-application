import * as chai from "chai";
import * as express from "express";

import { AuthenticationController } from "../../../express/controllers/authentication";
import { Mongoose } from "../../../mongoose";
import { UserDocument, AuthToken } from "../../../mongoose/models/user";

const index = require("../../");

const authenticationController = new AuthenticationController();
const expect = chai.expect;

describe("express/controllers/authentication.ts", function() {
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
        await Mongoose.User.mock({ email: "taken@example.com" });
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
      user = await Mongoose.User.mock({ password: "password" });
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
    let token: AuthToken;
    let user: UserDocument;

    beforeEach(async function() {
      user = await Mongoose.User.mock({});
      ({ token, user } = await user.login());
    });

    it("logs the user out", async function() {
      const req = {} as express.Request;
      req.headers = {};
      req.headers.authorization = token.toString();

      const res = await authenticationController.logout(req);

      expect(res.message).to.exist;
    });
  });

  // describe("POST /authentication/request-password-reset", function() {
  //   let token: AuthToken;
  //   let user: UserDocument;

  //   beforeEach(async function() {
  //     user = await Mongoose.User.mock({});
  //     ({ token, user } = await user.login());
  //   });

  //   it("returns a 200 status", async function() {
  //     const method = "post";
  //     const path = "/authentication/request-password-reset";
  //     const params = {
  //       email: user.email
  //     };

  //     const res = await apiHelper.request(method, path, params, null);

  //     expect(res.status).to.eq(200);
  //   });
  // });

  // describe("POST /authentication/reset-password", function() {
  //   let token: AuthToken;
  //   let user: UserDocument;

  //   beforeEach(async function() {
  //     user = await Mongoose.User.mock({});
  //     ({ token, user } = await user.login());
  //     user = await user.requestPasswordReset();
  //   });

  //   it("returns a 200 status", async function() {
  //     const method = "post";
  //     const path = "/authentication/reset-password";
  //     const params = {
  //       password: "newpassword",
  //       resetHash: user.resetHash
  //     };

  //     const res = await apiHelper.request(method, path, params, user.email);

  //     expect(res.status).to.eq(200);
  //   });
  // });
});
