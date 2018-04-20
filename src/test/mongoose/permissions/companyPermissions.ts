import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, CompanyDocument, CompanyPermissions, Company } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new CompanyPermissions();

describe("mongoose/permissions/companyPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        billingAddress: chance.hash(),
        category: chance.hash(),
        description: chance.hash(),
        fax: chance.hash(),
        name: chance.hash(),
        numberOfEmployees: chance.integer(),
        phone: chance.hash(),
        shippingAddress: chance.hash(),
        type: chance.hash(),
        website: chance.hash()
      };

      const record = <CompanyDocument> await permissions.create(params, {}, user);

      expect(record.billingAddress).to.eql(params.billingAddress);
      expect(record.category).to.eql(params.category);
      expect(record.description).to.eql(params.description);
      expect(record.fax).to.eql(params.fax);
      expect(record.name).to.eql(params.name);
      expect(record.numberOfEmployees).to.eql(params.numberOfEmployees);
      expect(record.phone).to.eql(params.phone);
      expect(record.shippingAddress).to.eql(params.shippingAddress);
      expect(record.type).to.eql(params.type);
      expect(record.website).to.eql(params.website);
    });
  });

  describe("read()", function() {
    let record: CompanyDocument;

    beforeEach(async function() {
      record = await Mongoose.Company.mock({
        billingAddress: chance.hash(),
        category: chance.hash(),
        description: chance.hash(),
        fax: chance.hash(),
        name: chance.hash(),
        numberOfEmployees: chance.integer(),
        phone: chance.hash(),
        shippingAddress: chance.hash(),
        type: chance.hash(),
        website: chance.hash()
      });
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <CompanyDocument> await permissions.read(record, user);

      expect(record.billingAddress).to.exist;
      expect(record.category).to.exist;
      expect(record.description).to.exist;
      expect(record.fax).to.exist;
      expect(record.name).to.exist;
      expect(record.numberOfEmployees).to.exist;
      expect(record.phone).to.exist;
      expect(record.shippingAddress).to.exist;
      expect(record.type).to.exist;
      expect(record.website).to.exist;
    });
  });

  describe("remove()", function() {
    let record: CompanyDocument;

    beforeEach(async function() {
      record = await Mongoose.Company.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <CompanyDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: CompanyDocument;

    beforeEach(async function() {
      record = await Mongoose.Company.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        billingAddress: chance.hash(),
        category: chance.hash(),
        description: chance.hash(),
        fax: chance.hash(),
        name: chance.hash(),
        numberOfEmployees: chance.integer(),
        phone: chance.hash(),
        shippingAddress: chance.hash(),
        type: chance.hash(),
        website: chance.hash()
      };

      record = <CompanyDocument> await permissions.update(record, params, {}, user);

      expect(record.billingAddress).to.eql(params.billingAddress);
      expect(record.category).to.eql(params.category);
      expect(record.description).to.eql(params.description);
      expect(record.fax).to.eql(params.fax);
      expect(record.name).to.eql(params.name);
      expect(record.numberOfEmployees).to.eql(params.numberOfEmployees);
      expect(record.phone).to.eql(params.phone);
      expect(record.shippingAddress).to.eql(params.shippingAddress);
      expect(record.type).to.eql(params.type);
      expect(record.website).to.eql(params.website);
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
