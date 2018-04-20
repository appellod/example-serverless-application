import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, OwnershipDocument, OwnershipPermissions } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new OwnershipPermissions();

describe("mongoose/permissions/ownershipPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        companyId: chance.hash(),
        companyIdFromTrigger: chance.hash(),
        contactId: chance.hash(),
        contactRole: chance.hash(),
        isPrimaryContact: chance.bool(),
        propertyId: chance.hash()
      };

      const record = <OwnershipDocument> await permissions.create(params, {}, user);

      expect(record.companyId).to.eql(params.companyId);
      expect(record.companyIdFromTrigger).to.eql(params.companyIdFromTrigger);
      expect(record.contactId).to.eql(params.contactId);
      expect(record.contactRole).to.eql(params.contactRole);
      expect(record.isPrimaryContact).to.eql(params.isPrimaryContact);
      expect(record.propertyId).to.eql(params.propertyId);
    });
  });

  describe("read()", function() {
    let record: OwnershipDocument;

    beforeEach(async function() {
      record = await Mongoose.Ownership.mock({
        companyId: chance.hash(),
        companyIdFromTrigger: chance.hash(),
        contactId: chance.hash(),
        contactRole: chance.hash(),
        isPrimaryContact: chance.bool(),
        propertyId: chance.hash()
      });
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <OwnershipDocument> await permissions.read(record, user);

      expect(record.companyId).to.exist;
      expect(record.companyIdFromTrigger).to.exist;
      expect(record.contactId).to.exist;
      expect(record.contactRole).to.exist;
      expect(record.isPrimaryContact).to.exist;
      expect(record.propertyId).to.exist;
    });
  });

  describe("remove()", function() {
    let record: OwnershipDocument;

    beforeEach(async function() {
      record = await Mongoose.Ownership.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <OwnershipDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: OwnershipDocument;

    beforeEach(async function() {
      record = await Mongoose.Ownership.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        companyId: chance.hash(),
        companyIdFromTrigger: chance.hash(),
        contactId: chance.hash(),
        contactRole: chance.hash(),
        isPrimaryContact: chance.bool(),
        propertyId: chance.hash()
      };

      record = <OwnershipDocument> await permissions.update(record, params, {}, user);

      expect(record.companyId).to.eql(params.companyId);
      expect(record.companyIdFromTrigger).to.eql(params.companyIdFromTrigger);
      expect(record.contactId).to.eql(params.contactId);
      expect(record.contactRole).to.eql(params.contactRole);
      expect(record.isPrimaryContact).to.eql(params.isPrimaryContact);
      expect(record.propertyId).to.eql(params.propertyId);
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
