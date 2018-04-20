import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, OfferDocument, OfferPermissions } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new OfferPermissions();

describe("mongoose/permissions/offerPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        additionalDeposit: chance.hash(),
        closeDate: chance.hash(),
        contractId: chance.hash(),
        feasibilityPeriod: chance.hash(),
        financingPeriod: chance.hash(),
        independentConsideration: chance.hash(),
        initialDeposit: chance.hash(),
        listingId: chance.hash(),
        name: chance.hash(),
        offerDate: chance.hash(),
        offerPrice: chance.hash(),
        purchaserId: chance.hash(),
        status: chance.hash()
      };

      const record = <OfferDocument> await permissions.create(params, {}, user);

      expect(record.additionalDeposit).to.eql(params.additionalDeposit);
      expect(record.closeDate).to.eql(params.closeDate);
      expect(record.contractId).to.eql(params.contractId);
      expect(record.feasibilityPeriod).to.eql(params.feasibilityPeriod);
      expect(record.financingPeriod).to.eql(params.financingPeriod);
      expect(record.independentConsideration).to.eql(params.independentConsideration);
      expect(record.initialDeposit).to.eql(params.initialDeposit);
      expect(record.listingId).to.eql(params.listingId);
      expect(record.name).to.eql(params.name);
      expect(record.offerDate).to.eql(params.offerDate);
      expect(record.offerPrice).to.eql(params.offerPrice);
      expect(record.purchaserId).to.eql(params.purchaserId);
      expect(record.status).to.eql(params.status);
    });
  });

  describe("read()", function() {
    let record: OfferDocument;

    beforeEach(async function() {
      record = await Mongoose.Offer.mock({
        additionalDeposit: chance.hash(),
        closeDate: chance.hash(),
        contractId: chance.hash(),
        feasibilityPeriod: chance.hash(),
        financingPeriod: chance.hash(),
        independentConsideration: chance.hash(),
        initialDeposit: chance.hash(),
        listingId: chance.hash(),
        name: chance.hash(),
        offerDate: chance.hash(),
        offerPrice: chance.hash(),
        purchaserId: chance.hash(),
        status: chance.hash()
      });
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <OfferDocument> await permissions.read(record, user);

      expect(record.additionalDeposit).to.exist;
      expect(record.closeDate).to.exist;
      expect(record.contractId).to.exist;
      expect(record.feasibilityPeriod).to.exist;
      expect(record.financingPeriod).to.exist;
      expect(record.independentConsideration).to.exist;
      expect(record.initialDeposit).to.exist;
      expect(record.listingId).to.exist;
      expect(record.name).to.exist;
      expect(record.offerDate).to.exist;
      expect(record.offerPrice).to.exist;
      expect(record.purchaserId).to.exist;
      expect(record.status).to.exist;
    });
  });

  describe("remove()", function() {
    let record: OfferDocument;

    beforeEach(async function() {
      record = await Mongoose.Offer.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <OfferDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: OfferDocument;

    beforeEach(async function() {
      record = await Mongoose.Offer.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        additionalDeposit: chance.hash(),
        closeDate: chance.hash(),
        contractId: chance.hash(),
        feasibilityPeriod: chance.hash(),
        financingPeriod: chance.hash(),
        independentConsideration: chance.hash(),
        initialDeposit: chance.hash(),
        listingId: chance.hash(),
        name: chance.hash(),
        offerDate: chance.hash(),
        offerPrice: chance.hash(),
        purchaserId: chance.hash(),
        status: chance.hash()
      };

      record = <OfferDocument> await permissions.update(record, params, {}, user);

      expect(record.additionalDeposit).to.eql(params.additionalDeposit);
      expect(record.closeDate).to.eql(params.closeDate);
      expect(record.contractId).to.eql(params.contractId);
      expect(record.feasibilityPeriod).to.eql(params.feasibilityPeriod);
      expect(record.financingPeriod).to.eql(params.financingPeriod);
      expect(record.independentConsideration).to.eql(params.independentConsideration);
      expect(record.initialDeposit).to.eql(params.initialDeposit);
      expect(record.listingId).to.eql(params.listingId);
      expect(record.name).to.eql(params.name);
      expect(record.offerDate).to.eql(params.offerDate);
      expect(record.offerPrice).to.eql(params.offerPrice);
      expect(record.purchaserId).to.eql(params.purchaserId);
      expect(record.status).to.eql(params.status);
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
