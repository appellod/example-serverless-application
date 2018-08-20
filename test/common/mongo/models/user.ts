import { expect } from "chai";
import * as nock from "nock";

import { User, UserDocument } from "../../../../src/common/mongo";

describe("common/mongo/models/user.ts", function() {
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
