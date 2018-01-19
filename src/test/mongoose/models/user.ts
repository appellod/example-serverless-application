import * as chai from "chai";
import * as nock from "nock";

import { Mongoose } from "../../../mongoose";
import { UserDocument, AuthToken } from "../../../mongoose/models/user";

const index = require("../../");
const expect = chai.expect;

describe("mongoose/models/user.ts", function() {
  describe("schema.statics.resetPassword()", function() {
    let user: UserDocument;

    beforeEach(async function() {
      user = await Mongoose.User.mock({});
      user = await user.requestPasswordReset();
    });

    it("updates the user's password", async function() {
      const previousPassword = user.password;
      user = await Mongoose.User.resetPassword(user.resetHash, "password");
      expect(user.password).to.not.eq(previousPassword);
    });

    it("removes the user's resetHash", async function() {
      user = await Mongoose.User.resetPassword(user.resetHash, "password");
      expect(user.resetHash).to.be.undefined;
    });
  });

  describe("schema.methods.login()", function() {
    let token: AuthToken;
    let user: UserDocument;

    beforeEach(async function() {
      user = await Mongoose.User.mock({});
    });

    it("adds an access token to the user's tokens array", async function() {
      ({ token, user } = await user.login());

      expect(user.tokens.length).to.eq(1);
      expect(user.tokens[0]._id.toString()).to.eq(token._id.toString());
    });
  });

  describe("schema.methods.logout()", function() {
    let token: AuthToken;
    let user: UserDocument;

    beforeEach(async function() {
      user = await Mongoose.User.mock({});
      ({ token, user } = await user.login());
    });

    it("removes the token that was used for the API request", async function() {
      user = await user.logout(token._id);
      expect(user.tokens.length).to.eq(0);
    });
  });

  describe("schema.methods.refreshToken()", function() {
    let token: AuthToken;
    let user: UserDocument;

    beforeEach(async function() {
      user = await Mongoose.User.mock({});
      ({ token, user } = await user.login());
    });

    it("updates the token's expiresAt", async function() {
      const expiresAt = user.tokens[0].expiresAt;

      user = await user.refreshToken(token._id);
      expect(user.tokens[0].expiresAt).to.be.above(expiresAt.getTime());
    });
  });

  describe("schema.methods.requestPasswordReset()", async function() {
    let user: UserDocument;

    beforeEach(async function() {
      user = await Mongoose.User.mock({});

      nock(/mailgun\.net/)
        .post(/.*/)
        .reply(200, {
          id: "<20170422765241.92160.12345.951E2345@sandboxf70783234584b198234561d8029e646.mailgun.org>",
          message: "Queued. Thank you."
        });
    });

    it("sets the user's resetHash to a random hash", async function() {
      user = await user.requestPasswordReset();
      expect(user.resetHash).to.be.exist;
    });
  });
});
