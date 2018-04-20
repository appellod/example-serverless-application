import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, ContactGroupDocument, ContactGroupPermissions, ContactGroup } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new ContactGroupPermissions();

describe("mongoose/permissions/contactGroupPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        createdDate: chance.hash(),
        name: chance.hash(),
        numberOfMembers: chance.integer()
      };

      const record = <ContactGroupDocument> await permissions.create(params, {}, user);

      expect(record.createdDate).to.eql(params.createdDate);
      expect(record.name).to.eql(params.name);
      expect(record.numberOfMembers).to.eql(params.numberOfMembers);
    });
  });

  describe("read()", function() {
    let record: ContactGroupDocument;

    beforeEach(async function() {
      record = await Mongoose.ContactGroup.mock({
        createdDate: chance.hash(),
        name: chance.hash(),
        numberOfMembers: chance.integer()
      });
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <ContactGroupDocument> await permissions.read(record, user);

      expect(record.createdDate).to.exist;
      expect(record.name).to.exist;
      expect(record.numberOfMembers).to.exist;
    });
  });

  describe("remove()", function() {
    let record: ContactGroupDocument;

    beforeEach(async function() {
      record = await Mongoose.ContactGroup.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <ContactGroupDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: ContactGroupDocument;

    beforeEach(async function() {
      record = await Mongoose.ContactGroup.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        createdDate: chance.hash(),
        name: chance.hash(),
        numberOfMembers: chance.integer()
      };

      record = <ContactGroupDocument> await permissions.update(record, params, {}, user);

      expect(record.createdDate).to.eql(params.createdDate);
      expect(record.name).to.eql(params.name);
      expect(record.numberOfMembers).to.eql(params.numberOfMembers);
    });
  });

  describe("where()", function() {
    it("returns a valid where query", async function() {
      const user = await Mongoose.User.mock();
      const params = {};

      const query = await permissions.where(params, user);

      expect(query).to.eql({ ownerId: user._id });
    });
  });
});
