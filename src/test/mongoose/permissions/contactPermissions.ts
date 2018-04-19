import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, ContactDocument, ContactPermissions, Contact } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new ContactPermissions();

describe("mongoose/permissions/contactPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        address: chance.hash(),
        companyId: chance.hash(),
        description: chance.hash(),
        email: chance.hash(),
        email2: chance.hash(),
        fax: chance.hash(),
        firstName: chance.hash(),
        fullName: chance.hash(),
        homePhone: chance.hash(),
        lastName: chance.hash(),
        mobilePhone: chance.hash(),
        otherPhone: chance.hash(),
        phone: chance.hash(),
        title: chance.hash(),
        type: chance.hash()
      };

      const record = <ContactDocument> await permissions.create(params, {}, user);

      expect(record.address).to.eql(params.address);
      expect(record.companyId).to.eql(params.companyId);
      expect(record.description).to.eql(params.description);
      expect(record.email).to.eql(params.email);
      expect(record.email2).to.eql(params.email2);
      expect(record.fax).to.eql(params.fax);
      expect(record.firstName).to.eql(params.firstName);
      expect(record.fullName).to.eql(params.fullName);
      expect(record.homePhone).to.eql(params.homePhone);
      expect(record.lastName).to.eql(params.lastName);
      expect(record.mobilePhone).to.eql(params.mobilePhone);
      expect(record.otherPhone).to.eql(params.otherPhone);
      expect(record.phone).to.eql(params.phone);
      expect(record.title).to.eql(params.title);
      expect(record.type).to.eql(params.type);
    });
  });

  describe("read()", function() {
    let record: ContactDocument;

    beforeEach(async function() {
      record = await Mongoose.Contact.mock({
        address: chance.hash(),
        companyId: chance.hash(),
        description: chance.hash(),
        email: chance.hash(),
        email2: chance.hash(),
        fax: chance.hash(),
        firstName: chance.hash(),
        fullName: chance.hash(),
        homePhone: chance.hash(),
        lastName: chance.hash(),
        mobilePhone: chance.hash(),
        otherPhone: chance.hash(),
        phone: chance.hash(),
        title: chance.hash(),
        type: chance.hash()
      });
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <ContactDocument> await permissions.read(record, user);

      expect(record.address).to.exist;
      expect(record.companyId).to.exist;
      expect(record.description).to.exist;
      expect(record.email).to.exist;
      expect(record.email2).to.exist;
      expect(record.fax).to.exist;
      expect(record.firstName).to.exist;
      expect(record.fullName).to.exist;
      expect(record.homePhone).to.exist;
      expect(record.lastName).to.exist;
      expect(record.mobilePhone).to.exist;
      expect(record.otherPhone).to.exist;
      expect(record.phone).to.exist;
      expect(record.title).to.exist;
      expect(record.type).to.exist;
    });
  });

  describe("remove()", function() {
    let record: ContactDocument;

    beforeEach(async function() {
      record = await Mongoose.Contact.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <ContactDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: ContactDocument;

    beforeEach(async function() {
      record = await Mongoose.Contact.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        address: chance.hash(),
        companyId: chance.hash(),
        description: chance.hash(),
        email: chance.hash(),
        email2: chance.hash(),
        fax: chance.hash(),
        firstName: chance.hash(),
        fullName: chance.hash(),
        homePhone: chance.hash(),
        lastName: chance.hash(),
        mobilePhone: chance.hash(),
        otherPhone: chance.hash(),
        phone: chance.hash(),
        title: chance.hash(),
        type: chance.hash()
      };

      record = <ContactDocument> await permissions.update(record, params, {}, user);

      expect(record.address).to.eql(params.address);
      expect(record.companyId).to.eql(params.companyId);
      expect(record.description).to.eql(params.description);
      expect(record.email).to.eql(params.email);
      expect(record.email2).to.eql(params.email2);
      expect(record.fax).to.eql(params.fax);
      expect(record.firstName).to.eql(params.firstName);
      expect(record.fullName).to.eql(params.fullName);
      expect(record.homePhone).to.eql(params.homePhone);
      expect(record.lastName).to.eql(params.lastName);
      expect(record.mobilePhone).to.eql(params.mobilePhone);
      expect(record.otherPhone).to.eql(params.otherPhone);
      expect(record.phone).to.eql(params.phone);
      expect(record.title).to.eql(params.title);
      expect(record.type).to.eql(params.type);
    });
  });

  describe("where()", function() {
    it("returns a valid where query", async function() {
      const user = await Mongoose.User.mock();
      const params = {};

      const query = await permissions.where(params, user);

      expect(query).to.eql({});
    });
  });
});
