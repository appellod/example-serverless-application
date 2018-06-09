import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { User, UserPermissions, UserDocument } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new UserPermissions();

describe("mongoose/permissions/userPermissions.ts", function() {
  describe("create()", function() {
    context("when user is an admin", function() {
      it("creates a new record", async function() {
        const params = {
          email: chance.email(),
          password: chance.hash()
        };
        const user = await User.mock({
          level: 1
        });

        const record = <UserDocument> await permissions.create(params, {}, user);

        expect(record.email).to.eq(params.email);
        expect(record.level).to.eq(0);
        expect(record.password).to.not.eq(params.password);
        expect(record.resetHash).to.be.undefined;
      });
    });

    context("when user is not an admin", function() {
      it("returns an error", async function() {
        const params = {
          email: chance.email(),
          password: chance.hash()
        };
        const user = await User.mock({
          level: 0
        });

        try {
          const record = <UserDocument> await permissions.create(params, {}, user);
        } catch (e) {
          expect(e.message).to.eql("User does not have permission to perform this action.");
          return;
        }

        throw new Error("Error should have been thrown.");
      });
    });
  });

  describe("read()", function() {
    let record: UserDocument;

    beforeEach(async function() {
      record = await User.mock();
    });

    context("when user is an admin", function() {
      it ("returns the record", async function() {
        const user = await User.mock({
          level: 1
        });

        record = <UserDocument> await permissions.read(record, user);

        expect(record._id).to.exist;
        expect(record.email).to.exist;
        expect(record.level).to.exist;
        expect(record.password).to.be.undefined;
        expect(record.resetHash).to.be.undefined;
      });
    });

    context("when user is not an admin", function() {
      context("when user is accessing their own record", function() {
        it ("returns the record", async function() {
          record = <UserDocument> await permissions.read(record, record);

          expect(record._id).to.exist;
          expect(record.email).to.exist;
          expect(record.level).to.exist;
          expect(record.password).to.be.undefined;
          expect(record.resetHash).to.be.undefined;
        });
      });

      context("when user is accessing another user's record", function() {
        it ("returns the record", async function() {
          const user = await User.mock({
            level: 0
          });

          record = <UserDocument> await permissions.read(record, user);

          expect(record._id).to.exist;
          expect(record.email).to.exist;
          expect(record.level).to.be.undefined;
          expect(record.password).to.be.undefined;
          expect(record.resetHash).to.be.undefined;
        });
      });
    });
  });

  describe("remove()", function() {
    let record: UserDocument;

    beforeEach(async function() {
      record = await User.mock();
    });

    context("when the user is an admin", function() {
      it("returns the record", async function() {
        const user = await User.mock({
          level: 1
        });

        record = <UserDocument> await permissions.remove(record, user);

        expect(record).to.exist;
      });
    });

    context("when the user is not an admin", function() {
      context("when user is removing their own record", function() {
        it ("returns the record", async function() {
          record = <UserDocument> await permissions.remove(record, record);

          expect(record).to.exist;
        });
      });

      context("when user is removing another user's record", function() {
        it ("returns an error", async function() {
          const user = await User.mock({
            level: 0
          });

          try {
            record = <UserDocument> await permissions.remove(record, user);
          } catch (e) {
            expect(e.message).to.eql("User does not have permission to perform this action.");
            return;
          }

          throw new Error("Error should have been thrown.");
        });
      });
    });
  });

  describe("update()", function() {
    let record: UserDocument;

    beforeEach(async function() {
      record = await User.mock();
    });

    context("when the user is an admin", function() {
      it("updates and returns the record", async function() {
        const params = {
          email: chance.email(),
          level: record.level + 1
        };
        const user = await User.mock({
          level: 1
        });

        record = <UserDocument> await permissions.update(record, params, {}, user);

        expect(record.email).to.eq(params.email);
        expect(record.level).to.eq(params.level);
        expect(record.password).to.be.undefined;
        expect(record.resetHash).to.be.undefined;
      });
    });

    context("when the user is not an admin", function() {
      context("when user is updating their own record", function() {
        it("updates and returns the record", async function() {
          const params = {
            email: chance.email(),
            level: record.level + 1
          };

          record = <UserDocument> await permissions.update(record, params, {}, record);

          expect(record.email).to.eq(params.email);
          expect(record.level).to.eq(params.level - 1);
          expect(record.password).to.be.undefined;
          expect(record.resetHash).to.be.undefined;
        });
      });

      context("when user is updating another user's record", function() {
        it ("returns an error", async function() {
          const params = {
            email: chance.email(),
            level: record.level + 1
          };
          const user = await User.mock({
            level: 0
          });

          try {
            record = <UserDocument> await permissions.update(record, params, {}, user);
          } catch (e) {
            expect(e.message).to.eql("User does not have permission to perform this action.");
            return;
          }

          throw new Error("Error should have been thrown.");
        });
      });
    });
  });

  describe("where()", function() {
    context("when the user is an admin", function() {
      it("returns a valid where query", async function() {
        const params = {
          email: chance.email(),
          level: 1
        };
        const user = await User.mock({
          level: 1
        });

        const query = await permissions.where(params, user);

        expect(query.email).to.eql(params.email);
        expect(query.level).to.eql(1);
      });
    });

    context("when the user is not an admin", function() {
      it("returns a valid where query", async function() {
        const params = {
          email: chance.email(),
          level: 1
        };
        const user = await User.mock({
          level: 0
        });

        const query = await permissions.where(params, user);

        expect(query.email).to.eql(params.email);
        expect(query.$and[0]).to.eql({ level: 0 });
        expect(query.$and[1]).to.eql({ level: 1 });
      });
    });
  });
});
