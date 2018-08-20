import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Chance } from "chance";

import { User, UserPermissions } from "../../../../src/common/postgres";
import { UserMock } from "../mocks";

const chance = new Chance();
const expect = chai.expect;
const permissions = new UserPermissions();

chai.use(chaiAsPromised);

describe("common/mongo/permissions/user.ts", function() {
  describe("create()", function() {
    context("when user is an admin", function() {
      it("creates a new record", async function() {
        const params = {
          email: chance.email(),
          password: chance.hash()
        };
        const user = await UserMock.insert({
          level: 1
        });

        const record = await permissions.create(params, {}, user);

        expect(record.email).to.eql(params.email);
        expect(record.level).to.eql(0);
        expect(record.password).to.not.eql(params.password);
        expect(record.reset_hash).to.be.undefined;
      });
    });

    context("when user is not an admin", function() {
      it("returns an error", async function() {
        const params = {
          email: chance.email(),
          password: chance.hash()
        };
        const user = await UserMock.insert({
          level: 0
        });

        const promise = permissions.create(params, {}, user);

        return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
      });
    });
  });

  describe("read()", function() {
    let record: User;

    beforeEach(async function() {
      record = await UserMock.insert();
    });

    context("when user is an admin", function() {
      it ("returns the record", async function() {
        const user = await UserMock.insert({
          level: 1
        });

        record = await permissions.read(record, user);

        expect(record.id).to.exist;
        expect(record.email).to.exist;
        expect(record.level).to.exist;
        expect(record.password).to.be.undefined;
        expect(record.reset_hash).to.be.undefined;
      });
    });

    context("when user is not an admin", function() {
      context("when user is accessing their own record", function() {
        it ("returns the record", async function() {
          record = await permissions.read(record, record);

          expect(record.id).to.exist;
          expect(record.email).to.exist;
          expect(record.level).to.exist;
          expect(record.password).to.be.undefined;
          expect(record.reset_hash).to.be.undefined;
        });
      });

      context("when user is accessing another user's record", function() {
        it ("returns the record", async function() {
          const user = await UserMock.insert({
            level: 0
          });

          record = await permissions.read(record, user);

          expect(record.id).to.exist;
          expect(record.email).to.exist;
          expect(record.level).to.be.undefined;
          expect(record.password).to.be.undefined;
          expect(record.reset_hash).to.be.undefined;
        });
      });
    });
  });

  describe("remove()", function() {
    let record: User;

    beforeEach(async function() {
      record = await UserMock.insert();
    });

    context("when the user is an admin", function() {
      it("returns 1", async function() {
        const user = await UserMock.insert({
          level: 1
        });

        const results = await permissions.remove(record, user);

        expect(results).to.eql(1);
      });
    });

    context("when the user is not an admin", function() {
      context("when user is removing their own record", function() {
        it ("returns 1", async function() {
          const results = await permissions.remove(record, record);

          expect(results).to.eql(1);
        });
      });

      context("when user is removing another user's record", function() {
        it ("returns an error", async function() {
          const user = await UserMock.insert({
            level: 0
          });

          const promise = permissions.remove(record, user);

          return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
        });
      });
    });
  });

  describe("update()", function() {
    let record: User;

    beforeEach(async function() {
      record = await UserMock.insert();
    });

    context("when the user is an admin", function() {
      it("updates and returns the record", async function() {
        const params = {
          email: chance.email(),
          level: record.level + 1
        };
        const user = await UserMock.insert({
          level: 1
        });

        record = await permissions.update(record, params, {}, user);

        expect(record.email).to.eql(params.email);
        expect(record.level).to.eql(params.level);
        expect(record.password).to.be.undefined;
        expect(record.reset_hash).to.be.undefined;
      });
    });

    context("when the user is not an admin", function() {
      context("when user is updating their own record", function() {
        it("updates and returns the record", async function() {
          const params = {
            email: chance.email(),
            level: record.level + 1
          };

          record = await permissions.update(record, params, {}, record);

          expect(record.email).to.eql(params.email);
          expect(record.level).to.eql(params.level - 1);
          expect(record.password).to.be.undefined;
          expect(record.reset_hash).to.be.undefined;
        });
      });

      context("when user is updating another user's record", function() {
        it ("returns an error", async function() {
          const params = {
            email: chance.email(),
            level: record.level + 1
          };
          const user = await UserMock.insert({
            level: 0
          });

          const promise = permissions.update(record, params, {}, user);

          return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
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
        const user = await UserMock.insert({
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
        const user = await UserMock.insert({
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
