import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, ListingDocument, ListingPermissions } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new ListingPermissions();

describe("mongoose/permissions/listingPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        activityId: chance.hash(),
        askingPriceActual: chance.integer(),
        capRate: chance.integer(),
        commission: chance.hash(),
        commissionAmount: chance.integer(),
        createdDate: chance.hash(),
        dateOffMarket: chance.hash(),
        dateOnMarket: chance.hash(),
        expirationDate: chance.hash(),
        lastModifiedDate: chance.hash(),
        maxPrice: chance.integer(),
        maxSqft: chance.integer(),
        minCapRate: chance.integer(),
        minCashOnCash: chance.integer(),
        minIRR: chance.integer(),
        minLIRR: chance.integer(),
        minPrice: chance.integer(),
        minSqft: chance.integer(),
        name: chance.hash(),
        noi: chance.hash(),
        onMarketStatus: chance.hash(),
        ownerContact: chance.hash(),
        probability: chance.integer(),
        propertyId: chance.hash(),
        propertyType: chance.hash(),
        pursuitId: chance.hash(),
        recordTypeDeveloperName: chance.hash(),
        recordTypeId: chance.hash(),
        repAgreementDate: chance.hash(),
        seller: chance.hash(),
        stage: chance.hash(),
        totalReturn: chance.integer(),
        type: chance.hash(),
        yield: chance.integer()
      };

      const record = <ListingDocument> await permissions.create(params, {}, user);

      expect(record.activityId).to.eql(params.activityId);
      expect(record.askingPriceActual).to.eql(params.askingPriceActual);
      expect(record.capRate).to.eql(params.capRate);
      expect(record.commission).to.eql(params.commission);
      expect(record.commissionAmount).to.eql(params.commissionAmount);
      expect(record.createdDate).to.eql(params.createdDate);
      expect(record.dateOffMarket).to.eql(params.dateOffMarket);
      expect(record.dateOnMarket).to.eql(params.dateOnMarket);
      expect(record.expirationDate).to.eql(params.expirationDate);
      expect(record.lastModifiedDate).to.eql(params.lastModifiedDate);
      expect(record.maxPrice).to.eql(params.maxPrice);
      expect(record.maxSqft).to.eql(params.maxSqft);
      expect(record.minCapRate).to.eql(params.minCapRate);
      expect(record.minCashOnCash).to.eql(params.minCashOnCash);
      expect(record.minIRR).to.eql(params.minIRR);
      expect(record.minLIRR).to.eql(params.minLIRR);
      expect(record.minPrice).to.eql(params.minPrice);
      expect(record.minSqft).to.eql(params.minSqft);
      expect(record.name).to.eql(params.name);
      expect(record.noi).to.eql(params.noi);
      expect(record.onMarketStatus).to.eql(params.onMarketStatus);
      expect(record.ownerContact).to.eql(params.ownerContact);
      expect(record.probability).to.eql(params.probability);
      expect(record.propertyId).to.eql(params.propertyId);
      expect(record.propertyType).to.eql(params.propertyType);
      expect(record.pursuitId).to.eql(params.pursuitId);
      expect(record.recordTypeDeveloperName).to.eql(params.recordTypeDeveloperName);
      expect(record.recordTypeId).to.eql(params.recordTypeId);
      expect(record.repAgreementDate).to.eql(params.repAgreementDate);
      expect(record.seller).to.eql(params.seller);
      expect(record.stage).to.eql(params.stage);
      expect(record.totalReturn).to.eql(params.totalReturn);
      expect(record.type).to.eql(params.type);
      expect(record.yield).to.eql(params.yield);
    });
  });

  describe("read()", function() {
    let record: ListingDocument;

    beforeEach(async function() {
      record = await Mongoose.Listing.mock({
        activityId: chance.hash(),
        askingPriceActual: chance.integer(),
        capRate: chance.integer(),
        commission: chance.hash(),
        commissionAmount: chance.integer(),
        createdDate: chance.hash(),
        dateOffMarket: chance.hash(),
        dateOnMarket: chance.hash(),
        expirationDate: chance.hash(),
        lastModifiedDate: chance.hash(),
        maxPrice: chance.integer(),
        maxSqft: chance.integer(),
        minCapRate: chance.integer(),
        minCashOnCash: chance.integer(),
        minIRR: chance.integer(),
        minLIRR: chance.integer(),
        minPrice: chance.integer(),
        minSqft: chance.integer(),
        name: chance.hash(),
        noi: chance.hash(),
        onMarketStatus: chance.hash(),
        ownerContact: chance.hash(),
        probability: chance.integer(),
        propertyId: chance.hash(),
        propertyType: chance.hash(),
        pursuitId: chance.hash(),
        recordTypeDeveloperName: chance.hash(),
        recordTypeId: chance.hash(),
        repAgreementDate: chance.hash(),
        seller: chance.hash(),
        stage: chance.hash(),
        totalReturn: chance.integer(),
        type: chance.hash(),
        yield: chance.integer()
      });
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <ListingDocument> await permissions.read(record, user);

      expect(record.activityId).to.exist;
      expect(record.askingPriceActual).to.exist;
      expect(record.capRate).to.exist;
      expect(record.commission).to.exist;
      expect(record.commissionAmount).to.exist;
      expect(record.createdDate).to.exist;
      expect(record.dateOffMarket).to.exist;
      expect(record.dateOnMarket).to.exist;
      expect(record.expirationDate).to.exist;
      expect(record.lastModifiedDate).to.exist;
      expect(record.maxPrice).to.exist;
      expect(record.maxSqft).to.exist;
      expect(record.minCapRate).to.exist;
      expect(record.minCashOnCash).to.exist;
      expect(record.minIRR).to.exist;
      expect(record.minLIRR).to.exist;
      expect(record.minPrice).to.exist;
      expect(record.minSqft).to.exist;
      expect(record.name).to.exist;
      expect(record.noi).to.exist;
      expect(record.onMarketStatus).to.exist;
      expect(record.ownerContact).to.exist;
      expect(record.probability).to.exist;
      expect(record.propertyId).to.exist;
      expect(record.propertyType).to.exist;
      expect(record.pursuitId).to.exist;
      expect(record.recordTypeDeveloperName).to.exist;
      expect(record.recordTypeId).to.exist;
      expect(record.repAgreementDate).to.exist;
      expect(record.seller).to.exist;
      expect(record.stage).to.exist;
      expect(record.totalReturn).to.exist;
      expect(record.type).to.exist;
      expect(record.yield).to.exist;
    });
  });

  describe("remove()", function() {
    let record: ListingDocument;

    beforeEach(async function() {
      record = await Mongoose.Listing.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <ListingDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: ListingDocument;

    beforeEach(async function() {
      record = await Mongoose.Listing.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        activityId: chance.hash(),
        askingPriceActual: chance.integer(),
        capRate: chance.integer(),
        commission: chance.hash(),
        commissionAmount: chance.integer(),
        createdDate: chance.hash(),
        dateOffMarket: chance.hash(),
        dateOnMarket: chance.hash(),
        expirationDate: chance.hash(),
        lastModifiedDate: chance.hash(),
        maxPrice: chance.integer(),
        maxSqft: chance.integer(),
        minCapRate: chance.integer(),
        minCashOnCash: chance.integer(),
        minIRR: chance.integer(),
        minLIRR: chance.integer(),
        minPrice: chance.integer(),
        minSqft: chance.integer(),
        name: chance.hash(),
        noi: chance.hash(),
        onMarketStatus: chance.hash(),
        ownerContact: chance.hash(),
        probability: chance.integer(),
        propertyId: chance.hash(),
        propertyType: chance.hash(),
        pursuitId: chance.hash(),
        recordTypeDeveloperName: chance.hash(),
        recordTypeId: chance.hash(),
        repAgreementDate: chance.hash(),
        seller: chance.hash(),
        stage: chance.hash(),
        totalReturn: chance.integer(),
        type: chance.hash(),
        yield: chance.integer()
      };

      record = <ListingDocument> await permissions.update(record, params, {}, user);

      expect(record.activityId).to.eql(params.activityId);
      expect(record.askingPriceActual).to.eql(params.askingPriceActual);
      expect(record.capRate).to.eql(params.capRate);
      expect(record.commission).to.eql(params.commission);
      expect(record.commissionAmount).to.eql(params.commissionAmount);
      expect(record.createdDate).to.eql(params.createdDate);
      expect(record.dateOffMarket).to.eql(params.dateOffMarket);
      expect(record.dateOnMarket).to.eql(params.dateOnMarket);
      expect(record.expirationDate).to.eql(params.expirationDate);
      expect(record.lastModifiedDate).to.eql(params.lastModifiedDate);
      expect(record.maxPrice).to.eql(params.maxPrice);
      expect(record.maxSqft).to.eql(params.maxSqft);
      expect(record.minCapRate).to.eql(params.minCapRate);
      expect(record.minCashOnCash).to.eql(params.minCashOnCash);
      expect(record.minIRR).to.eql(params.minIRR);
      expect(record.minLIRR).to.eql(params.minLIRR);
      expect(record.minPrice).to.eql(params.minPrice);
      expect(record.minSqft).to.eql(params.minSqft);
      expect(record.name).to.eql(params.name);
      expect(record.noi).to.eql(params.noi);
      expect(record.onMarketStatus).to.eql(params.onMarketStatus);
      expect(record.ownerContact).to.eql(params.ownerContact);
      expect(record.probability).to.eql(params.probability);
      expect(record.propertyId).to.eql(params.propertyId);
      expect(record.propertyType).to.eql(params.propertyType);
      expect(record.pursuitId).to.eql(params.pursuitId);
      expect(record.recordTypeDeveloperName).to.eql(params.recordTypeDeveloperName);
      expect(record.recordTypeId).to.eql(params.recordTypeId);
      expect(record.repAgreementDate).to.eql(params.repAgreementDate);
      expect(record.seller).to.eql(params.seller);
      expect(record.stage).to.eql(params.stage);
      expect(record.totalReturn).to.eql(params.totalReturn);
      expect(record.type).to.eql(params.type);
      expect(record.yield).to.eql(params.yield);
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
