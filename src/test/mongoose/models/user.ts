import { expect } from "chai";
import * as nock from "nock";

import { Token, TokenDocument, User, UserDocument } from "../../../mongoose";

const index = require("../../");

describe("mongoose/models/user.ts", function() {
  describe("schema.statics.resetPassword()", function() {
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();

      nock(/mailgun\.net/)
        .post(/.*/)
        .reply(200, {
          id: "<20170422765241.92160.12345.951E2345@sandboxf70783234584b198234561d8029e646.mailgun.org>",
          message: "Queued. Thank you."
        });

      user = await user.requestPasswordReset();
    });

    it("updates the user's password", async function() {
      const previousPassword = user.password;
      user = await User.resetPassword(user.resetHash, "password");
      expect(user.password).to.not.eq(previousPassword);
    });

    it("removes the user's resetHash", async function() {
      user = await User.resetPassword(user.resetHash, "password");
      expect(user.resetHash).to.be.undefined;
    });

    it("removes all the user's access token", async function() {
      const token = await Token.create({ userId: user._id });

      user = await User.resetPassword(user.resetHash, "password");

      const count = await Token.count({ userId: user._id });
      expect(count).to.eql(0);
    });
  });

  describe("schema.methods.login()", function() {
    let token: TokenDocument;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
    });

    it("adds an access token associated with the user", async function() {
      ({ token, user } = await user.login());

      const tokens = await Token.find({ userId: user._id });

      expect(tokens.length).to.eq(1);
      expect(tokens[0].id).to.eq(token.id);
    });
  });

  describe("schema.methods.logout()", function() {
    let token: TokenDocument;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
      ({ token, user } = await user.login());
    });

    it("removes the token that was used for the API request", async function() {
      user = await user.logout(token._id);

      const count = await Token.count({ userId: user._id });
      expect(count).to.eq(0);
    });
  });

  describe("schema.methods.requestPasswordReset()", async function() {
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();

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
