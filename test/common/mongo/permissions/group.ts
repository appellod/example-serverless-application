import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Chance } from "chance";
import * as nock from "nock";

import { Group, GroupDocument, GroupPermissions, User, UserDocument } from "../../../../src/common/mongo";

const chance = new Chance();
const expect = chai.expect;
const permissions = new GroupPermissions();

chai.use(chaiAsPromised);

describe("common/mongo/permissions/group.ts", function() {
  describe("addAssociations()", function() {
    let record: GroupDocument;

    beforeEach(async function() {
      record = await Group.mock();
    });

    context("when adding an association to userIds", function() {
      context("when the user is an admin", function() {
        it("adds the userId to the record's userIds", async function() {
          const user = await User.mock({ level: 1 });

          record = <GroupDocument> await permissions.addAssociations(record, "userIds", [user.id], user);

          expect(record.userIds).to.contain(user._id);
        });
      });

      context("when the user is not an admin", function() {
        let user: UserDocument;

        beforeEach(async function() {
          user = await User.mock();
        });

        context("when user has permission", function() {
          it("adds the userId to the record's userIds", async function() {
            record.ownerId = user._id;

            record = <GroupDocument> await permissions.addAssociations(record, "userIds", [user.id], user);

            expect(record.userIds).to.contain(user._id);
          });
        });

        context("when user does not have permission", function() {
          it("returns an error", function() {
            const promise = permissions.addAssociations(record, "userIds", [user.id], user);

            return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
          });
        });
      });
    });
  });

  describe("create()", function() {
    context("when user is an admin", function() {
      it("creates a new record", async function() {
        const user = await User.mock({ level: 1 });
        const params = {
          isPrivate: chance.bool(),
          ownerId: user._id,
          userIds: [user._id]
        };

        const record = <GroupDocument> await permissions.create(params, {}, user);

        expect(record.isPrivate).to.eql(params.isPrivate);
        expect(record.ownerId).to.eql(user._id);
        expect(record.userIds).to.contain(user._id);
      });
    });

    context("when user is not an admin", function() {
      it("returns an error", async function() {
        const user = await User.mock();
        const otherUser = await User.mock();
        const params = {
          isPrivate: chance.bool(),
          ownerId: otherUser._id,
          userIds: [otherUser._id]
        };

        const record = <GroupDocument> await permissions.create(params, {
          ownerId: user._id,
          userIds: [user._id]
        }, user);

        expect(record.isPrivate).to.eql(params.isPrivate);
        expect(record.ownerId).to.eql(user._id);
        expect(record.userIds).to.contain(user._id);
        expect(record.userIds).to.not.contain(otherUser._id);
      });
    });
  });

  describe("read()", function() {
    let record: GroupDocument;

    beforeEach(async function() {
      record = await Group.mock({
        isPrivate: true
      });
    });

    context("when user is an admin", function() {
      it ("returns the record", async function() {
        const user = await User.mock({ level: 1 });

        record = <GroupDocument> await permissions.read(record, user);

        expect(record._id).to.exist;
        expect(record.isPrivate).to.exist;
        expect(record.ownerId).to.exist;
        expect(record.userIds).to.exist;
      });
    });

    context("when user is not an admin", function() {
      let user: UserDocument;

      beforeEach(async function() {
        user = await User.mock();
      });

      context("when user is a member of the group", function() {
        it ("returns the record", async function() {
          record.userIds = [user._id];
          record = <GroupDocument> await permissions.read(record, user);

          expect(record._id).to.exist;
          expect(record.isPrivate).to.exist;
          expect(record.ownerId).to.exist;
          expect(record.userIds).to.exist;
        });
      });

      context("when user is is not a member of the group", function() {
        it ("returns an error", function() {
          const promise = permissions.read(record, user);

          return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
        });
      });
    });
  });

  describe("remove()", function() {
    let record: GroupDocument;

    beforeEach(async function() {
      record = await Group.mock();
    });

    context("when the user is an admin", function() {
      it("returns the record", async function() {
        const user = await User.mock({ level: 1 });

        record = <GroupDocument> await permissions.remove(record, user);

        expect(record).to.exist;
      });
    });

    context("when the user is not an admin", function() {
      let user: UserDocument;

      beforeEach(async function() {
        user = await User.mock();
      });

      context("when user is removing their own group", function() {
        it ("returns the record", async function() {
          record.ownerId = user._id;
          record = <GroupDocument> await permissions.remove(record, user);

          expect(record).to.exist;
        });
      });

      context("when user is removing another user's group", function() {
        it ("returns an error", async function() {
          const promise = permissions.remove(record, user);

          return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
        });
      });
    });
  });

  describe("removeAllAssociations()", function() {
    let associatedUser: UserDocument;
    let record: GroupDocument;

    beforeEach(async function() {
      associatedUser = await User.mock();
      record = await Group.mock({ userIds: [associatedUser._id] });
    });

    context("when removing associations from userIds", function() {
      context("when the user is an admin", function() {
        it("removes the record's userIds", async function() {
          const user = await User.mock({ level: 1 });

          record = <GroupDocument> await permissions.removeAllAssociations(record, "userIds", user);

          expect(record.userIds).to.not.contain(associatedUser._id);
        });
      });

      context("when the user is not an admin", function() {
        let user: UserDocument;

        beforeEach(async function() {
          user = await User.mock();
        });

        context("when user has permission", function() {
          it("removes the record's userIds", async function() {
            record.ownerId = user._id;

            record = <GroupDocument> await permissions.removeAllAssociations(record, "userIds", user);

            expect(record.userIds).to.not.contain(associatedUser._id);
          });
        });

        context("when user does not have permission", function() {
          it("returns an error", function() {
            const promise = permissions.removeAllAssociations(record, "userIds", user);

            return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
          });
        });
      });
    });
  });

  describe("removeAssociations()", function() {
    let associatedUser: UserDocument;
    let record: GroupDocument;

    beforeEach(async function() {
      associatedUser = await User.mock();
      record = await Group.mock({ userIds: [associatedUser._id] });
    });

    context("when removing associations from userIds", function() {
      context("when the user is an admin", function() {
        it("removes the userId from the record's userIds", async function() {
          const user = await User.mock({ level: 1 });

          record = <GroupDocument> await permissions.removeAssociations(record, "userIds", [associatedUser.id], user);

          expect(record.userIds).to.not.contain(associatedUser._id);
        });
      });

      context("when the user is not an admin", function() {
        let user: UserDocument;

        beforeEach(async function() {
          user = await User.mock();
        });

        context("when user has permission", function() {
          it("removes the userId from the record's userIds", async function() {
            record.ownerId = user._id;

            record = <GroupDocument> await permissions.removeAssociations(record, "userIds", [associatedUser.id], user);

            expect(record.userIds).to.not.contain(associatedUser._id);
          });
        });

        context("when user does not have permission", function() {
          it("returns an error", function() {
            const promise = permissions.removeAssociations(record, "userIds", [associatedUser.id], user);

            return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
          });
        });
      });
    });
  });

  describe("update()", function() {
    let record: GroupDocument;

    beforeEach(async function() {
      record = await Group.mock();
    });

    context("when the user is an admin", function() {
      it("updates and returns the record", async function() {
        const user = await User.mock({ level: 1 });
        const params = {
          isPrivate: chance.bool(),
          ownerId: user._id,
          userIds: [user._id]
        };

        record = <GroupDocument> await permissions.update(record, params, {}, user);

        expect(record.isPrivate).to.eql(params.isPrivate);
        expect(record.ownerId).to.eql(user._id);
        expect(record.userIds).to.not.contain(user._id);
      });
    });

    context("when the user is not an admin", function() {
      let user: UserDocument;

      beforeEach(async function() {
        user = await User.mock();
      });

      context("when user is updating their own group", function() {
        it("updates and returns the record", async function() {
          const params = {
            isPrivate: !record.isPrivate,
            ownerId: user._id,
            userIds: [user._id]
          };

          record.ownerId = user._id;
          record = <GroupDocument> await permissions.update(record, params, {}, user);

          expect(record.isPrivate).to.eql(params.isPrivate);
          expect(record.ownerId).to.eql(user._id);
          expect(record.userIds).to.not.contain(user._id);
        });
      });

      context("when user is updating another user's group", function() {
        it ("returns an error", async function() {
          const params = {
            isPrivate: !record.isPrivate,
            ownerId: user._id,
            userIds: [user._id]
          };

          const promise = permissions.update(record, params, {}, user);

          return expect(promise).to.be.rejectedWith("User does not have permission to perform this action.");
        });
      });
    });
  });

  describe("where()", function() {
    context("when the user is an admin", function() {
      it("returns a valid where query", async function() {
        const user = await User.mock({ level: 1 });
        const params = {
          isPrivate: chance.bool(),
          ownerId: user._id,
          userIds: [user._id]
        };

        const query = await permissions.where(params, user);

        expect(query.isPrivate).to.eql(params.isPrivate);
        expect(query.ownerId).to.eql(params.ownerId);
        expect(query.userIds).to.eql(params.userIds);
      });
    });

    context("when the user is not an admin", function() {
      it("returns a valid where query", async function() {
        const user = await User.mock();
        const params = {
          isPrivate: chance.bool(),
          ownerId: user._id,
          userIds: [user._id]
        };

        const query = await permissions.where(params, user);

        expect(query.$or).to.eql([
          { isPrivate: false },
          { ownerId: user._id},
          { userIds: user._id }
        ]);
        expect(query.isPrivate).to.eql(params.isPrivate);
        expect(query.ownerId).to.eql(params.ownerId);
        expect(query.userIds).to.eql(params.userIds);
      });
    });
  });
});
