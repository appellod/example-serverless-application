import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, ContractDocument, ContractPermissions } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new ContractPermissions();

describe("mongoose/permissions/contractPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        buyerAttorneyContactId: chance.hash(),
        buyerCompanyId: chance.hash(),
        buyerContactId: chance.hash(),
        buyerLoanContactId: chance.hash(),
        clientCompanyId: chance.hash(),
        clientContactId: chance.hash(),
        commissionAmount: chance.integer(),
        contractCloseDate: chance.hash(),
        contractPrice: chance.integer(),
        createdDate: chance.hash(),
        deposit: chance.integer(),
        description: chance.hash(),
        effectiveDate: chance.hash(),
        landlordCompanyId: chance.hash(),
        landlordContactId: chance.hash(),
        lastModifiedDate: chance.hash(),
        listingId: chance.hash(),
        name: chance.hash(),
        probability: chance.hash(),
        propertyId: chance.hash(),
        pursuitId: chance.hash(),
        recordTypeId: chance.hash(),
        sellerAttorneyContactId: chance.hash(),
        sellerCompanyId: chance.hash(),
        sellerContactId: chance.hash(),
        status: chance.hash(),
        tenantCompanyId: chance.hash(),
        tenantContactId: chance.hash(),
        titleCompanyAttorneyContactId: chance.hash(),
        type: chance.hash()
      };

      const record = <ContractDocument> await permissions.create(params, {}, user);

      expect(record.buyerAttorneyContactId).to.eql(params.buyerAttorneyContactId);
      expect(record.buyerCompanyId).to.eql(params.buyerCompanyId);
      expect(record.buyerContactId).to.eql(params.buyerContactId);
      expect(record.buyerLoanContactId).to.eql(params.buyerLoanContactId);
      expect(record.clientCompanyId).to.eql(params.clientCompanyId);
      expect(record.clientContactId).to.eql(params.clientContactId);
      expect(record.commissionAmount).to.eql(params.commissionAmount);
      expect(record.contractCloseDate).to.eql(params.contractCloseDate);
      expect(record.contractPrice).to.eql(params.contractPrice);
      expect(record.createdDate).to.eql(params.createdDate);
      expect(record.deposit).to.eql(params.deposit);
      expect(record.description).to.eql(params.description);
      expect(record.effectiveDate).to.eql(params.effectiveDate);
      expect(record.landlordCompanyId).to.eql(params.landlordCompanyId);
      expect(record.landlordContactId).to.eql(params.landlordContactId);
      expect(record.lastModifiedDate).to.eql(params.lastModifiedDate);
      expect(record.listingId).to.eql(params.listingId);
      expect(record.name).to.eql(params.name);
      expect(record.probability).to.eql(params.probability);
      expect(record.propertyId).to.eql(params.propertyId);
      expect(record.pursuitId).to.eql(params.pursuitId);
      expect(record.recordTypeId).to.eql(params.recordTypeId);
      expect(record.sellerAttorneyContactId).to.eql(params.sellerAttorneyContactId);
      expect(record.sellerCompanyId).to.eql(params.sellerCompanyId);
      expect(record.sellerContactId).to.eql(params.sellerContactId);
      expect(record.status).to.eql(params.status);
      expect(record.tenantCompanyId).to.eql(params.tenantCompanyId);
      expect(record.tenantContactId).to.eql(params.tenantContactId);
      expect(record.titleCompanyAttorneyContactId).to.eql(params.titleCompanyAttorneyContactId);
      expect(record.type).to.eql(params.type);
    });
  });

  describe("read()", function() {
    let record: ContractDocument;

    beforeEach(async function() {
      record = await Mongoose.Contract.mock({
        buyerAttorneyContactId: chance.hash(),
        buyerCompanyId: chance.hash(),
        buyerContactId: chance.hash(),
        buyerLoanContactId: chance.hash(),
        clientCompanyId: chance.hash(),
        clientContactId: chance.hash(),
        commissionAmount: chance.integer(),
        contractCloseDate: chance.hash(),
        contractPrice: chance.integer(),
        createdDate: chance.hash(),
        deposit: chance.integer(),
        description: chance.hash(),
        effectiveDate: chance.hash(),
        landlordCompanyId: chance.hash(),
        landlordContactId: chance.hash(),
        lastModifiedDate: chance.hash(),
        listingId: chance.hash(),
        name: chance.hash(),
        probability: chance.hash(),
        propertyId: chance.hash(),
        pursuitId: chance.hash(),
        recordTypeId: chance.hash(),
        sellerAttorneyContactId: chance.hash(),
        sellerCompanyId: chance.hash(),
        sellerContactId: chance.hash(),
        status: chance.hash(),
        tenantCompanyId: chance.hash(),
        tenantContactId: chance.hash(),
        titleCompanyAttorneyContactId: chance.hash(),
        type: chance.hash()
      });
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <ContractDocument> await permissions.read(record, user);

      expect(record.buyerAttorneyContactId).to.exist;
      expect(record.buyerCompanyId).to.exist;
      expect(record.buyerContactId).to.exist;
      expect(record.buyerLoanContactId).to.exist;
      expect(record.clientCompanyId).to.exist;
      expect(record.clientContactId).to.exist;
      expect(record.commissionAmount).to.exist;
      expect(record.contractCloseDate).to.exist;
      expect(record.contractPrice).to.exist;
      expect(record.createdDate).to.exist;
      expect(record.deposit).to.exist;
      expect(record.description).to.exist;
      expect(record.effectiveDate).to.exist;
      expect(record.landlordCompanyId).to.exist;
      expect(record.landlordContactId).to.exist;
      expect(record.lastModifiedDate).to.exist;
      expect(record.listingId).to.exist;
      expect(record.name).to.exist;
      expect(record.probability).to.exist;
      expect(record.propertyId).to.exist;
      expect(record.pursuitId).to.exist;
      expect(record.recordTypeId).to.exist;
      expect(record.sellerAttorneyContactId).to.exist;
      expect(record.sellerCompanyId).to.exist;
      expect(record.sellerContactId).to.exist;
      expect(record.status).to.exist;
      expect(record.tenantCompanyId).to.exist;
      expect(record.tenantContactId).to.exist;
      expect(record.titleCompanyAttorneyContactId).to.exist;
      expect(record.type).to.exist;
    });
  });

  describe("remove()", function() {
    let record: ContractDocument;

    beforeEach(async function() {
      record = await Mongoose.Contract.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <ContractDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: ContractDocument;

    beforeEach(async function() {
      record = await Mongoose.Contract.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        buyerAttorneyContactId: chance.hash(),
        buyerCompanyId: chance.hash(),
        buyerContactId: chance.hash(),
        buyerLoanContactId: chance.hash(),
        clientCompanyId: chance.hash(),
        clientContactId: chance.hash(),
        commissionAmount: chance.integer(),
        contractCloseDate: chance.hash(),
        contractPrice: chance.integer(),
        createdDate: chance.hash(),
        deposit: chance.integer(),
        description: chance.hash(),
        effectiveDate: chance.hash(),
        landlordCompanyId: chance.hash(),
        landlordContactId: chance.hash(),
        lastModifiedDate: chance.hash(),
        listingId: chance.hash(),
        name: chance.hash(),
        probability: chance.hash(),
        propertyId: chance.hash(),
        pursuitId: chance.hash(),
        recordTypeId: chance.hash(),
        sellerAttorneyContactId: chance.hash(),
        sellerCompanyId: chance.hash(),
        sellerContactId: chance.hash(),
        status: chance.hash(),
        tenantCompanyId: chance.hash(),
        tenantContactId: chance.hash(),
        titleCompanyAttorneyContactId: chance.hash(),
        type: chance.hash()
      };

      record = <ContractDocument> await permissions.update(record, params, {}, user);

      expect(record.buyerAttorneyContactId).to.eql(params.buyerAttorneyContactId);
      expect(record.buyerCompanyId).to.eql(params.buyerCompanyId);
      expect(record.buyerContactId).to.eql(params.buyerContactId);
      expect(record.buyerLoanContactId).to.eql(params.buyerLoanContactId);
      expect(record.clientCompanyId).to.eql(params.clientCompanyId);
      expect(record.clientContactId).to.eql(params.clientContactId);
      expect(record.commissionAmount).to.eql(params.commissionAmount);
      expect(record.contractCloseDate).to.eql(params.contractCloseDate);
      expect(record.contractPrice).to.eql(params.contractPrice);
      expect(record.createdDate).to.eql(params.createdDate);
      expect(record.deposit).to.eql(params.deposit);
      expect(record.description).to.eql(params.description);
      expect(record.effectiveDate).to.eql(params.effectiveDate);
      expect(record.landlordCompanyId).to.eql(params.landlordCompanyId);
      expect(record.landlordContactId).to.eql(params.landlordContactId);
      expect(record.lastModifiedDate).to.eql(params.lastModifiedDate);
      expect(record.listingId).to.eql(params.listingId);
      expect(record.name).to.eql(params.name);
      expect(record.probability).to.eql(params.probability);
      expect(record.propertyId).to.eql(params.propertyId);
      expect(record.pursuitId).to.eql(params.pursuitId);
      expect(record.recordTypeId).to.eql(params.recordTypeId);
      expect(record.sellerAttorneyContactId).to.eql(params.sellerAttorneyContactId);
      expect(record.sellerCompanyId).to.eql(params.sellerCompanyId);
      expect(record.sellerContactId).to.eql(params.sellerContactId);
      expect(record.status).to.eql(params.status);
      expect(record.tenantCompanyId).to.eql(params.tenantCompanyId);
      expect(record.tenantContactId).to.eql(params.tenantContactId);
      expect(record.titleCompanyAttorneyContactId).to.eql(params.titleCompanyAttorneyContactId);
      expect(record.type).to.eql(params.type);
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
