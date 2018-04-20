import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, CompDocument, CompPermissions } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new CompPermissions();

describe("mongoose/permissions/compPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        archive: chance.bool(),
        askingPrice: chance.integer(),
        buildingClass: chance.hash(),
        buyerCompanyId: chance.hash(),
        buyerId: chance.hash(),
        capRate: chance.integer(),
        cashOnCash: chance.integer(),
        closeDate: chance.date(),
        commissionAmount: chance.integer(),
        commissionPercent: chance.integer(),
        contractId: chance.hash(),
        downPayment: chance.integer(),
        grossCommissionAmount: chance.integer(),
        leaseCommencementDate: chance.date(),
        leaseExpirationDate: chance.date(),
        leaseTermMonths: chance.integer(),
        leaseTotal: chance.integer(),
        leaseType: chance.hash(),
        listingId: chance.hash(),
        mortgageAmount: chance.integer(),
        netOperatingIncome: chance.integer(),
        occupancyAtClose: chance.integer(),
        priceType: chance.hash(),
        pursuitId: chance.hash(),
        recordType: chance.hash(),
        recordTypeId: chance.hash(),
        researchComplete: chance.bool(),
        salePrice: chance.integer(),
        sellerCompanyId: chance.hash(),
        sellerId: chance.hash(),
        soldPropertyId: chance.hash(),
        squareFootage: chance.integer(),
        tenancyAtClose: chance.hash(),
        termRemainingAtClose: chance.hash(),
        units: chance.integer()
      };

      const record = <CompDocument> await permissions.create(params, {}, user);

      expect(record.archive).to.eql(params.archive);
      expect(record.askingPrice).to.eql(params.askingPrice);
      expect(record.buildingClass).to.eql(params.buildingClass);
      expect(record.buyerCompanyId).to.eql(params.buyerCompanyId);
      expect(record.buyerId).to.eql(params.buyerId);
      expect(record.capRate).to.eql(params.capRate);
      expect(record.cashOnCash).to.eql(params.cashOnCash);
      expect(record.closeDate).to.eql(params.closeDate);
      expect(record.commissionAmount).to.eql(params.commissionAmount);
      expect(record.commissionPercent).to.eql(params.commissionPercent);
      expect(record.contractId).to.eql(params.contractId);
      expect(record.downPayment).to.eql(params.downPayment);
      expect(record.grossCommissionAmount).to.eql(params.grossCommissionAmount);
      expect(record.leaseCommencementDate).to.eql(params.leaseCommencementDate);
      expect(record.leaseExpirationDate).to.eql(params.leaseExpirationDate);
      expect(record.leaseTermMonths).to.eql(params.leaseTermMonths);
      expect(record.leaseTotal).to.eql(params.leaseTotal);
      expect(record.leaseType).to.eql(params.leaseType);
      expect(record.listingId).to.eql(params.listingId);
      expect(record.mortgageAmount).to.eql(params.mortgageAmount);
      expect(record.netOperatingIncome).to.eql(params.netOperatingIncome);
      expect(record.occupancyAtClose).to.eql(params.occupancyAtClose);
      expect(record.priceType).to.eql(params.priceType);
      expect(record.pursuitId).to.eql(params.pursuitId);
      expect(record.recordType).to.eql(params.recordType);
      expect(record.recordTypeId).to.eql(params.recordTypeId);
      expect(record.researchComplete).to.eql(params.researchComplete);
      expect(record.salePrice).to.eql(params.salePrice);
      expect(record.sellerCompanyId).to.eql(params.sellerCompanyId);
      expect(record.sellerId).to.eql(params.sellerId);
      expect(record.soldPropertyId).to.eql(params.soldPropertyId);
      expect(record.squareFootage).to.eql(params.squareFootage);
      expect(record.tenancyAtClose).to.eql(params.tenancyAtClose);
      expect(record.termRemainingAtClose).to.eql(params.termRemainingAtClose);
      expect(record.units).to.eql(params.units);
    });
  });

  describe("read()", function() {
    let record: CompDocument;

    beforeEach(async function() {
      record = await Mongoose.Comp.mock({
        archive: chance.bool(),
        askingPrice: chance.integer(),
        buildingClass: chance.hash(),
        buyerCompanyId: chance.hash(),
        buyerId: chance.hash(),
        capRate: chance.integer(),
        cashOnCash: chance.integer(),
        closeDate: chance.date(),
        commissionAmount: chance.integer(),
        commissionPercent: chance.integer(),
        contractId: chance.hash(),
        downPayment: chance.integer(),
        grossCommissionAmount: chance.integer(),
        leaseCommencementDate: chance.date(),
        leaseExpirationDate: chance.date(),
        leaseTermMonths: chance.integer(),
        leaseTotal: chance.integer(),
        leaseType: chance.hash(),
        listingId: chance.hash(),
        mortgageAmount: chance.integer(),
        netOperatingIncome: chance.integer(),
        occupancyAtClose: chance.integer(),
        priceType: chance.hash(),
        pursuitId: chance.hash(),
        recordType: chance.hash(),
        recordTypeId: chance.hash(),
        researchComplete: chance.bool(),
        salePrice: chance.integer(),
        sellerCompanyId: chance.hash(),
        sellerId: chance.hash(),
        soldPropertyId: chance.hash(),
        squareFootage: chance.integer(),
        tenancyAtClose: chance.hash(),
        termRemainingAtClose: chance.hash(),
        units: chance.integer()
      });
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <CompDocument> await permissions.read(record, user);

      expect(record.archive).to.exist;
      expect(record.askingPrice).to.exist;
      expect(record.buildingClass).to.exist;
      expect(record.buyerCompanyId).to.exist;
      expect(record.buyerId).to.exist;
      expect(record.capRate).to.exist;
      expect(record.cashOnCash).to.exist;
      expect(record.closeDate).to.exist;
      expect(record.commissionAmount).to.exist;
      expect(record.commissionPercent).to.exist;
      expect(record.contractId).to.exist;
      expect(record.downPayment).to.exist;
      expect(record.grossCommissionAmount).to.exist;
      expect(record.leaseCommencementDate).to.exist;
      expect(record.leaseExpirationDate).to.exist;
      expect(record.leaseTermMonths).to.exist;
      expect(record.leaseTotal).to.exist;
      expect(record.leaseType).to.exist;
      expect(record.listingId).to.exist;
      expect(record.mortgageAmount).to.exist;
      expect(record.netOperatingIncome).to.exist;
      expect(record.occupancyAtClose).to.exist;
      expect(record.priceType).to.exist;
      expect(record.pursuitId).to.exist;
      expect(record.recordType).to.exist;
      expect(record.recordTypeId).to.exist;
      expect(record.researchComplete).to.exist;
      expect(record.salePrice).to.exist;
      expect(record.sellerCompanyId).to.exist;
      expect(record.sellerId).to.exist;
      expect(record.soldPropertyId).to.exist;
      expect(record.squareFootage).to.exist;
      expect(record.tenancyAtClose).to.exist;
      expect(record.termRemainingAtClose).to.exist;
      expect(record.units).to.exist;
    });
  });

  describe("remove()", function() {
    let record: CompDocument;

    beforeEach(async function() {
      record = await Mongoose.Comp.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <CompDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: CompDocument;

    beforeEach(async function() {
      record = await Mongoose.Comp.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        archive: chance.bool(),
        askingPrice: chance.integer(),
        buildingClass: chance.hash(),
        buyerCompanyId: chance.hash(),
        buyerId: chance.hash(),
        capRate: chance.integer(),
        cashOnCash: chance.integer(),
        closeDate: chance.date(),
        commissionAmount: chance.integer(),
        commissionPercent: chance.integer(),
        contractId: chance.hash(),
        downPayment: chance.integer(),
        grossCommissionAmount: chance.integer(),
        leaseCommencementDate: chance.date(),
        leaseExpirationDate: chance.date(),
        leaseTermMonths: chance.integer(),
        leaseTotal: chance.integer(),
        leaseType: chance.hash(),
        listingId: chance.hash(),
        mortgageAmount: chance.integer(),
        netOperatingIncome: chance.integer(),
        occupancyAtClose: chance.integer(),
        priceType: chance.hash(),
        pursuitId: chance.hash(),
        recordType: chance.hash(),
        recordTypeId: chance.hash(),
        researchComplete: chance.bool(),
        salePrice: chance.integer(),
        sellerCompanyId: chance.hash(),
        sellerId: chance.hash(),
        soldPropertyId: chance.hash(),
        squareFootage: chance.integer(),
        tenancyAtClose: chance.hash(),
        termRemainingAtClose: chance.hash(),
        units: chance.integer()
      };

      record = <CompDocument> await permissions.update(record, params, {}, user);

      expect(record.archive).to.eql(params.archive);
      expect(record.askingPrice).to.eql(params.askingPrice);
      expect(record.buildingClass).to.eql(params.buildingClass);
      expect(record.buyerCompanyId).to.eql(params.buyerCompanyId);
      expect(record.buyerId).to.eql(params.buyerId);
      expect(record.capRate).to.eql(params.capRate);
      expect(record.cashOnCash).to.eql(params.cashOnCash);
      expect(record.closeDate).to.eql(params.closeDate);
      expect(record.commissionAmount).to.eql(params.commissionAmount);
      expect(record.commissionPercent).to.eql(params.commissionPercent);
      expect(record.contractId).to.eql(params.contractId);
      expect(record.downPayment).to.eql(params.downPayment);
      expect(record.grossCommissionAmount).to.eql(params.grossCommissionAmount);
      expect(record.leaseCommencementDate).to.eql(params.leaseCommencementDate);
      expect(record.leaseExpirationDate).to.eql(params.leaseExpirationDate);
      expect(record.leaseTermMonths).to.eql(params.leaseTermMonths);
      expect(record.leaseTotal).to.eql(params.leaseTotal);
      expect(record.leaseType).to.eql(params.leaseType);
      expect(record.listingId).to.eql(params.listingId);
      expect(record.mortgageAmount).to.eql(params.mortgageAmount);
      expect(record.netOperatingIncome).to.eql(params.netOperatingIncome);
      expect(record.occupancyAtClose).to.eql(params.occupancyAtClose);
      expect(record.priceType).to.eql(params.priceType);
      expect(record.pursuitId).to.eql(params.pursuitId);
      expect(record.recordType).to.eql(params.recordType);
      expect(record.recordTypeId).to.eql(params.recordTypeId);
      expect(record.researchComplete).to.eql(params.researchComplete);
      expect(record.salePrice).to.eql(params.salePrice);
      expect(record.sellerCompanyId).to.eql(params.sellerCompanyId);
      expect(record.sellerId).to.eql(params.sellerId);
      expect(record.soldPropertyId).to.eql(params.soldPropertyId);
      expect(record.squareFootage).to.eql(params.squareFootage);
      expect(record.tenancyAtClose).to.eql(params.tenancyAtClose);
      expect(record.termRemainingAtClose).to.eql(params.termRemainingAtClose);
      expect(record.units).to.eql(params.units);
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
