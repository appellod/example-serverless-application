import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, BuyersNeedDocument, BuyersNeedPermissions, BuyersNeed } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new BuyersNeedPermissions();

describe("mongoose/permissions/buyersNeedPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        aquisitionType: chance.hash(),
        buildingType: chance.hash(),
        buyerQuality: chance.hash(),
        contactId: chance.hash(),
        isActive: chance.bool(),
        market: chance.hash(),
        maxPrice: chance.hash(),
        maxSquareFootage: chance.hash(),
        minCapRate: chance.integer(),
        minCashOnCash: chance.integer(),
        minIrr: chance.integer(),
        minLirr: chance.integer(),
        minPrice: chance.hash(),
        minSquareFootage: chance.hash(),
        name: chance.hash()
      };

      const record = <BuyersNeedDocument> await permissions.create(params, {}, user);

      expect(record.aquisitionType).to.eql(params.aquisitionType);
      expect(record.buildingType).to.eql(params.buildingType);
      expect(record.buyerQuality).to.eql(params.buyerQuality);
      expect(record.contactId).to.eql(params.contactId);
      expect(record.isActive).to.eql(params.isActive);
      expect(record.market).to.eql(params.market);
      expect(record.maxPrice).to.eql(params.maxPrice);
      expect(record.maxSquareFootage).to.eql(params.maxSquareFootage);
      expect(record.minCapRate).to.eql(params.minCapRate);
      expect(record.minCashOnCash).to.eql(params.minCashOnCash);
      expect(record.minIrr).to.eql(params.minIrr);
      expect(record.minLirr).to.eql(params.minLirr);
      expect(record.minPrice).to.eql(params.minPrice);
      expect(record.minSquareFootage).to.eql(params.minSquareFootage);
      expect(record.name).to.eql(params.name);
    });
  });

  describe("read()", function() {
    let record: BuyersNeedDocument;

    beforeEach(async function() {
      record = await Mongoose.BuyersNeed.mock({
        aquisitionType: chance.hash(),
        buildingType: chance.hash(),
        buyerQuality: chance.hash(),
        contactId: chance.hash(),
        isActive: chance.bool(),
        market: chance.hash(),
        maxPrice: chance.hash(),
        maxSquareFootage: chance.hash(),
        minCapRate: chance.integer(),
        minCashOnCash: chance.integer(),
        minIrr: chance.integer(),
        minLirr: chance.integer(),
        minPrice: chance.hash(),
        minSquareFootage: chance.hash(),
        name: chance.hash()
      });
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <BuyersNeedDocument> await permissions.read(record, user);

      expect(record.aquisitionType).to.exist;
      expect(record.buildingType).to.exist;
      expect(record.buyerQuality).to.exist;
      expect(record.contactId).to.exist;
      expect(record.isActive).to.exist;
      expect(record.market).to.exist;
      expect(record.maxPrice).to.exist;
      expect(record.maxSquareFootage).to.exist;
      expect(record.minCapRate).to.exist;
      expect(record.minCashOnCash).to.exist;
      expect(record.minIrr).to.exist;
      expect(record.minLirr).to.exist;
      expect(record.minPrice).to.exist;
      expect(record.minSquareFootage).to.exist;
      expect(record.name).to.exist;
    });
  });

  describe("remove()", function() {
    let record: BuyersNeedDocument;

    beforeEach(async function() {
      record = await Mongoose.BuyersNeed.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <BuyersNeedDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: BuyersNeedDocument;

    beforeEach(async function() {
      record = await Mongoose.BuyersNeed.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        aquisitionType: chance.hash(),
        buildingType: chance.hash(),
        buyerQuality: chance.hash(),
        contactId: chance.hash(),
        isActive: chance.bool(),
        market: chance.hash(),
        maxPrice: chance.hash(),
        maxSquareFootage: chance.hash(),
        minCapRate: chance.integer(),
        minCashOnCash: chance.integer(),
        minIrr: chance.integer(),
        minLirr: chance.integer(),
        minPrice: chance.hash(),
        minSquareFootage: chance.hash(),
        name: chance.hash()
      };

      record = <BuyersNeedDocument> await permissions.update(record, params, {}, user);

      expect(record.aquisitionType).to.eql(params.aquisitionType);
      expect(record.buildingType).to.eql(params.buildingType);
      expect(record.buyerQuality).to.eql(params.buyerQuality);
      expect(record.contactId).to.eql(params.contactId);
      expect(record.isActive).to.eql(params.isActive);
      expect(record.market).to.eql(params.market);
      expect(record.maxPrice).to.eql(params.maxPrice);
      expect(record.maxSquareFootage).to.eql(params.maxSquareFootage);
      expect(record.minCapRate).to.eql(params.minCapRate);
      expect(record.minCashOnCash).to.eql(params.minCashOnCash);
      expect(record.minIrr).to.eql(params.minIrr);
      expect(record.minLirr).to.eql(params.minLirr);
      expect(record.minPrice).to.eql(params.minPrice);
      expect(record.minSquareFootage).to.eql(params.minSquareFootage);
      expect(record.name).to.eql(params.name);
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
