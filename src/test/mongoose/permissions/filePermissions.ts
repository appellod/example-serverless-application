import * as chai from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, FilePermissions, FileDocument, UserDocument } from "../../../mongoose";

const chance = new Chance();
const expect = chai.expect;
const index = require("../../");
const permissions = new FilePermissions();

describe("mongoose/permissions/filePermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock({ level: 1 });
      const params = {
        isPublic: true,
        name: chance.hash(),
        userId: user._id
      };

      const record = <FileDocument> await permissions.create(params, user);

      expect(record.isPublic).to.eq(params.isPublic);
      expect(record.name).to.eq(params.name);
      expect(record.userId).to.eq(params.userId);
    });
  });

  describe("read()", function() {
    let record: FileDocument;

    beforeEach(async function() {
      record = await Mongoose.File.mock({
        isPublic: false,
        name: chance.hash()
      });
    });

    context("when user is an admin", function() {
      it ("returns the record", async function() {
        const user = await Mongoose.User.mock({ level: 1 });

        record = <FileDocument> await permissions.read(record, user);

        expect(record._id).to.exist;
        expect(record.isPublic).to.exist;
        expect(record.name).to.exist;
        expect(record.userId).to.exist;
      });
    });

    context("when user is not an admin", function() {
      context("when user is accessing a public record", function() {
        it("returns the record", async function() {
          const user = await Mongoose.User.mock({ level: 0 });
          record.isPublic = true;

          record = <FileDocument> await permissions.read(record, user);

          expect(record._id).to.exist;
          expect(record.isPublic).to.exist;
          expect(record.name).to.exist;
          expect(record.userId).to.exist;
        });
      });

      context("when user is accessing their own record", function() {
        it ("returns the record", async function() {
          const user = await Mongoose.User.mock({ level: 0 });
          record.userId = user._id;

          record = <FileDocument> await permissions.read(record, user);

          expect(record._id).to.exist;
          expect(record.isPublic).to.exist;
          expect(record.name).to.exist;
          expect(record.userId).to.exist;
        });
      });

      context("when user is accessing another user's record", function() {
        it ("returns the record", async function() {
          const user = await Mongoose.User.mock({ level: 0 });
          const otherUser = await Mongoose.User.mock();
          record.userId = otherUser._id;

          record = <FileDocument> await permissions.read(record, user);

          expect(record._id).to.not.exist;
          expect(record.isPublic).to.not.exist;
          expect(record.name).to.not.exist;
          expect(record.userId).to.not.exist;
        });
      });
    });
  });

  describe("remove()", function() {
    let record: FileDocument;

    beforeEach(async function() {
      record = await Mongoose.File.mock();
    });

    context("when the user is an admin", function() {
      it("returns the record", async function() {
        const user = await Mongoose.User.mock({ level: 1 });

        record = <FileDocument> await permissions.remove(record, user);

        expect(record).to.exist;
      });
    });

    context("when the user is not an admin", function() {
      let user: UserDocument;

      beforeEach(async function() {
        user = await Mongoose.User.mock();
      });

      context("when user is removing their own record", function() {
        it ("returns the record", async function() {
          record.userId = user._id;
          record = <FileDocument> await permissions.remove(record, user);

          expect(record).to.exist;
        });
      });

      context("when user is removing another user's record", function() {
        it ("returns an error", async function() {
          const otherUser = await Mongoose.User.mock({ level: 0 });
          record.userId = otherUser._id;

          try {
            record = <FileDocument> await permissions.remove(record, user);
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
    let record: FileDocument;

    beforeEach(async function() {
      record = await Mongoose.File.mock();
    });

    context("when the user is an admin", function() {
      it("updates and returns the record", async function() {
        const user = await Mongoose.User.mock({ level: 1 });
        const params = {
          isPublic: true,
          name: chance.hash(),
          userId: user._id
        };

        record = <FileDocument> await permissions.update(record, params, user);

        expect(record.isPublic).to.eq(params.isPublic);
        expect(record.name).to.eq(params.name);
        expect(record.userId).to.eq(params.userId);
      });
    });

    context("when the user is not an admin", function() {
      context("when user is updating their own record", function() {
        it("updates and returns the record", async function() {
          const user = await Mongoose.User.mock({ level: 0 });
          const params = {
            isPublic: true,
            name: chance.hash(),
            userId: user._id
          };
          record.userId = user._id;

          record = <FileDocument> await permissions.update(record, params, user);

          expect(record.isPublic).to.eq(params.isPublic);
          expect(record.name).to.eq(params.name);
          expect(record.userId).to.eq(params.userId);
        });
      });

      context("when user is updating another user's record", function() {
        it ("returns an error", async function() {
          const user = await Mongoose.User.mock({ level: 0 });
          const otherUser = await Mongoose.User.mock({ level: 0 });
          const params = {
            isPublic: true,
            name: chance.hash(),
            userId: user._id
          };
          record.userId = otherUser._id;

          try {
            record = <FileDocument> await permissions.update(record, params, user);
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
        const user = await Mongoose.User.mock({ level: 1 });
        const params = {
          isPublic: true,
          name: chance.hash(),
          userId: user._id
        };

        const query = await permissions.where(params, user);

        expect(query.isPublic).to.eql(params.isPublic);
        expect(query.name).to.eql(params.name);
        expect(query.userId).to.eql(params.userId);
      });
    });

    context("when the user is not an admin", function() {
      it("returns a valid where query", async function() {
        const user = await Mongoose.User.mock({ level: 0 });
        const params = {
          isPublic: true,
          name: chance.hash(),
          userId: user._id
        };

        const query = await permissions.where(params, user);

        expect(query.$or).to.exist;
        expect(query.isPublic).to.eql(params.isPublic);
        expect(query.name).to.eql(params.name);
        expect(query.userId).to.eql(params.userId);
      });
    });
  });
});
