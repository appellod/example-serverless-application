import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, DealPartyDocument, DealPartyPermissions } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new DealPartyPermissions();

describe("mongoose/permissions/dealPartyPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        compId: chance.hash(),
        company: chance.hash(),
        contactId: chance.hash(),
        contractId: chance.hash(),
        listingId: chance.hash(),
        pursuitId: chance.hash(),
        role: chance.hash(),
        sale: chance.hash(),
        saleCap: chance.integer(),
        saleDate: chance.date(),
        salePrice: chance.integer(),
        salePriceSF: chance.integer(),
        transactionCompany: chance.hash()
      };

      const record = <DealPartyDocument> await permissions.create(params, {}, user);

      expect(record.compId).to.eql(params.compId);
      expect(record.company).to.eql(params.company);
      expect(record.contactId).to.eql(params.contactId);
      expect(record.contractId).to.eql(params.contractId);
      expect(record.listingId).to.eql(params.listingId);
      expect(record.pursuitId).to.eql(params.pursuitId);
      expect(record.role).to.eql(params.role);
      expect(record.sale).to.eql(params.sale);
      expect(record.saleCap).to.eql(params.saleCap);
      expect(record.saleDate).to.eql(params.saleDate);
      expect(record.salePrice).to.eql(params.salePrice);
      expect(record.salePriceSF).to.eql(params.salePriceSF);
      expect(record.transactionCompany).to.eql(params.transactionCompany);
    });
  });

  describe("read()", function() {
    let record: DealPartyDocument;

    beforeEach(async function() {
      record = await Mongoose.DealParty.mock({
        compId: chance.hash(),
        company: chance.hash(),
        contactId: chance.hash(),
        contractId: chance.hash(),
        listingId: chance.hash(),
        pursuitId: chance.hash(),
        role: chance.hash(),
        sale: chance.hash(),
        saleCap: chance.integer(),
        saleDate: chance.date(),
        salePrice: chance.integer(),
        salePriceSF: chance.integer(),
        transactionCompany: chance.hash()
      });
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <DealPartyDocument> await permissions.read(record, user);

      expect(record.compId).to.exist;
      expect(record.company).to.exist;
      expect(record.contactId).to.exist;
      expect(record.contractId).to.exist;
      expect(record.listingId).to.exist;
      expect(record.pursuitId).to.exist;
      expect(record.role).to.exist;
      expect(record.sale).to.exist;
      expect(record.saleCap).to.exist;
      expect(record.saleDate).to.exist;
      expect(record.salePrice).to.exist;
      expect(record.salePriceSF).to.exist;
      expect(record.transactionCompany).to.exist;
    });
  });

  describe("remove()", function() {
    let record: DealPartyDocument;

    beforeEach(async function() {
      record = await Mongoose.DealParty.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <DealPartyDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: DealPartyDocument;

    beforeEach(async function() {
      record = await Mongoose.DealParty.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        compId: chance.hash(),
        company: chance.hash(),
        contactId: chance.hash(),
        contractId: chance.hash(),
        listingId: chance.hash(),
        pursuitId: chance.hash(),
        role: chance.hash(),
        sale: chance.hash(),
        saleCap: chance.integer(),
        saleDate: chance.date(),
        salePrice: chance.integer(),
        salePriceSF: chance.integer(),
        transactionCompany: chance.hash()
      };

      record = <DealPartyDocument> await permissions.update(record, params, {}, user);

      expect(record.compId).to.eql(params.compId);
      expect(record.company).to.eql(params.company);
      expect(record.contactId).to.eql(params.contactId);
      expect(record.contractId).to.eql(params.contractId);
      expect(record.listingId).to.eql(params.listingId);
      expect(record.pursuitId).to.eql(params.pursuitId);
      expect(record.role).to.eql(params.role);
      expect(record.sale).to.eql(params.sale);
      expect(record.saleCap).to.eql(params.saleCap);
      expect(record.saleDate).to.eql(params.saleDate);
      expect(record.salePrice).to.eql(params.salePrice);
      expect(record.salePriceSF).to.eql(params.salePriceSF);
      expect(record.transactionCompany).to.eql(params.transactionCompany);
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
