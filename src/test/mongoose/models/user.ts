import { expect } from "chai";
import * as nock from "nock";

import { User, UserDocument } from "../../../mongoose";
import { Token } from "../../../redis";

require("../../");

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
      expect(user.password).to.not.eql(previousPassword);
    });

    it("removes the user's resetHash", async function() {
      user = await User.resetPassword(user.resetHash, "password");
      expect(user.resetHash).to.be.undefined;
    });

    it("removes all the user's access token", async function() {
      const token = await Token.create(user);

      user = await User.resetPassword(user.resetHash, "password");

      const result = await Token.validate(token);
      expect(result).to.eql(null);
    });
  });

  describe("schema.methods.login()", function() {
    let token: string;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
    });

    it("adds an access token associated with the user", async function() {
      ({ token, user } = await user.login());

      const result = await Token.validate(token);

      expect(result).to.not.eql(null);
    });
  });

  describe("schema.methods.logout()", function() {
    let token: string;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
      ({ token, user } = await user.login());
    });

    it("removes the token that was used for the API request", async function() {
      user = await user.logout(token);

      const result = await Token.validate(token);
      expect(result).to.eql(null);
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
