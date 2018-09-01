import { expect } from "chai";
import * as nock from "nock";

import { User } from "../../../../src/common/postgres";
import { UserMock } from "../mocks";
import { Model } from "objection";

describe("common/postgres/models/user.ts", function() {
  let user: User;

  beforeEach(async function() {
    user = await UserMock.insert();
  });

  describe("relationMappings", function() {
    describe("friends", function() {
      it("gets the friends of the user", async function() {
        const friend = await UserMock.insert();
        await user.$relatedQuery("friends").relate(friend.id);

        const result = await User.query().findById(user.id).eager({ friends: true });
        expect(result.friends.length).to.eql(1);
      });
    });

    describe("ignored_users", function() {
      it("gets the ignored users", async function() {
        const friend = await UserMock.insert();
        await user.$relatedQuery("ignored_users").relate(friend.id);

        const result = await User.query().findById(user.id).eager({ ignored_users: true });

        expect(result.ignored_users.length).to.eql(1);
      });
    });
  });

  describe("requestPasswordReset()", function() {
    beforeEach(async function() {
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

  describe("resetPassword()", function() {
    beforeEach(async function() {
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
});
