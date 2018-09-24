import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Chance } from "chance";

import { User, UserPermissions } from "../../src";
import { UserMock } from "../../src/mocks";

const chance = new Chance();
const expect = chai.expect;
const permissions = new UserPermissions();

chai.use(chaiAsPromised);

describe("permissions/user.ts", function() {
  describe("create()", function() {
    context("when user is an admin", function() {
      it("creates a new record", async function() {
        const params = {
          email: chance.email(),
          password: chance.hash()
        };
        const user = await new UserMock({
          level: 1
        }).create();

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
        const user = await new UserMock({
          level: 0
        }).create();

        const promise = permissions.create(params, {}, user);

        return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
      });
    });
  });

  describe("read()", function() {
    let record: User;

    beforeEach(async function() {
      record = await new UserMock().create();
    });

    context("when user is an admin", function() {
      it ("returns the record", async function() {
        const user = await new UserMock({
          level: 1
        }).create();

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
          const user = await new UserMock({
            level: 0
          }).create();

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

  describe("relate()", function() {
    let admin: User;
    let child: User;
    let parent: User;
    let user: User;

    beforeEach(async function() {
      admin = await new UserMock({ level: 1 }).create();
      child = await new UserMock().create();
      parent = await new UserMock().create();
      user = await new UserMock().create();
    });

    context("when the operation is valid", function() {
      it("relates the two records", async function() {
        const record = await permissions.relate(parent, "friends", [child.id], admin);
        expect(record).to.exist;

        const children = await parent.$relatedQuery("friends");
        expect(children.length).to.eql(1);
      });
    });

    context("when the field is not a relation", function() {
      it("throws an error", async function() {
        const promise = permissions.relate(parent, "email", [child.id], admin);

        return expect(promise).to.be.rejectedWith("Cannot find relation: email.");
      });
    });

    context("when the user does not have permission", function() {
      it("throws an error", async function() {
        const promise = permissions.relate(parent, "friends", [child.id], user);

        return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
      });
    });
  });

  describe("remove()", function() {
    let record: User;

    beforeEach(async function() {
      record = await new UserMock().create();
    });

    context("when the user is an admin", function() {
      it("returns 1", async function() {
        const user = await new UserMock({
          level: 1
        }).create();

        const results = await permissions.remove(record, user);

        expect(results).to.eql(record);
      });
    });

    context("when the user is not an admin", function() {
      context("when user is removing their own record", function() {
        it ("returns 1", async function() {
          const results = await permissions.remove(record, record);

          expect(results).to.eql(record);
        });
      });

      context("when user is removing another user's record", function() {
        it ("returns an error", async function() {
          const user = await new UserMock({
            level: 0
          }).create();

          const promise = permissions.remove(record, user);

          return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
        });
      });
    });
  });

  describe("unrelate()", function() {
    let admin: User;
    let child: User;
    let parent: User;
    let user: User;

    beforeEach(async function() {
      admin = await new UserMock({ level: 1 }).create();
      child = await new UserMock().create();
      parent = await new UserMock().create();
      user = await new UserMock().create();

      await parent.$relatedQuery("friends").relate(child.id);
    });

    context("when the operation is valid", function() {
      it("unrelates the two records", async function() {
        const record = await permissions.unrelate(parent, "friends", [child.id], admin);
        expect(record).to.exist;

        const children = await parent.$relatedQuery("friends");
        expect(children.length).to.eql(0);
      });
    });

    context("when the field is not a relation", function() {
      it("throws an error", async function() {
        const promise = permissions.unrelate(parent, "email", [child.id], admin);

        return expect(promise).to.be.rejectedWith("Cannot find relation: email.");
      });
    });

    context("when the user does not have permission", function() {
      it("throws an error", async function() {
        const promise = permissions.unrelate(parent, "friends", [child.id], user);

        return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
      });
    });
  });

  describe("update()", function() {
    let record: User;

    beforeEach(async function() {
      record = await new UserMock().create();
    });

    context("when the user is an admin", function() {
      it("updates and returns the record", async function() {
        const params = {
          email: chance.email(),
          level: record.level + 1
        };
        const user = await new UserMock({
          level: 1
        }).create();

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
          const user = await new UserMock({
            level: 0
          }).create();

          const promise = permissions.update(record, params, {}, user);

          return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
        });
      });
    });
  });

  describe("unrelate()", function() {

  });

  describe("where()", function() {
    context("when the user is an admin", function() {
      it("returns a valid where query", async function() {
        const user = await new UserMock({
          level: 1
        }).create();

        const query = await permissions.where(user);

        expect(query).to.be.empty;
      });
    });

    context("when the user is not an admin", function() {
      it("returns a valid where query", async function() {
        const user = await new UserMock({
          level: 0
        }).create();

        const query = await permissions.where(user);

        expect(query.level).to.eql(0);
      });
    });
  });
});
