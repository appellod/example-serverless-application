import { expect } from "chai";
import * as nock from "nock";

import { User } from "../../../../src/common/postgres";
import { UserMock } from "../mocks";

describe("common/postgres/models/user.ts", function() {
  describe("schema.statics.resetPassword()", function() {
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

    it("updates the user's password", async function() {
      const previousPassword = user.password;
      user = await UserMock.resetPassword(user.reset_hash, "password");
      expect(user.password).to.not.eql(previousPassword);
    });

    it("clears the user's reset_hash", async function() {
      user = await UserMock.resetPassword(user.reset_hash, "password");
      expect(user.reset_hash).to.be.null;
    });
  });

  describe("schema.methods.requestPasswordReset()", async function() {
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

    it("sets the user's reset_hash to a random hash", async function() {
      user = await user.requestPasswordReset();
      expect(user.reset_hash).to.be.exist;
    });
  });
});
