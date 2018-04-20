import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, PursuitDocument, PursuitPermissions } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new PursuitPermissions();

describe("mongoose/permissions/pursuitPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        brokerProposedPrice: chance.integer(),
        clientCompanyId: chance.hash(),
        clientContactId: chance.hash(),
        commissionAmount: chance.integer(),
        createdDate: chance.hash(),
        lastModifiedDate: chance.hash(),
        name: chance.hash(),
        probability: chance.integer(),
        propertyId: chance.hash(),
        recordTypeId: chance.hash(),
        sellerPriceExpectation: chance.integer(),
        status: chance.hash(),
        type: chance.hash()
      };

      const record = <PursuitDocument> await permissions.create(params, {}, user);

      expect(record.brokerProposedPrice).to.eql(params.brokerProposedPrice);
      expect(record.clientCompanyId).to.eql(params.clientCompanyId);
      expect(record.clientContactId).to.eql(params.clientContactId);
      expect(record.commissionAmount).to.eql(params.commissionAmount);
      expect(record.createdDate).to.eql(params.createdDate);
      expect(record.lastModifiedDate).to.eql(params.lastModifiedDate);
      expect(record.name).to.eql(params.name);
      expect(record.probability).to.eql(params.probability);
      expect(record.propertyId).to.eql(params.propertyId);
      expect(record.recordTypeId).to.eql(params.recordTypeId);
      expect(record.sellerPriceExpectation).to.eql(params.sellerPriceExpectation);
      expect(record.status).to.eql(params.status);
      expect(record.type).to.eql(params.type);
    });
  });

  describe("read()", function() {
    let record: PursuitDocument;

    beforeEach(async function() {
      record = await Mongoose.Pursuit.mock({
        brokerProposedPrice: chance.integer(),
        clientCompanyId: chance.hash(),
        clientContactId: chance.hash(),
        commissionAmount: chance.integer(),
        createdDate: chance.hash(),
        lastModifiedDate: chance.hash(),
        name: chance.hash(),
        probability: chance.integer(),
        propertyId: chance.hash(),
        recordTypeId: chance.hash(),
        sellerPriceExpectation: chance.integer(),
        status: chance.hash(),
        type: chance.hash()
      });
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <PursuitDocument> await permissions.read(record, user);

      expect(record.brokerProposedPrice).to.exist;
      expect(record.clientCompanyId).to.exist;
      expect(record.clientContactId).to.exist;
      expect(record.commissionAmount).to.exist;
      expect(record.createdDate).to.exist;
      expect(record.lastModifiedDate).to.exist;
      expect(record.name).to.exist;
      expect(record.probability).to.exist;
      expect(record.propertyId).to.exist;
      expect(record.recordTypeId).to.exist;
      expect(record.sellerPriceExpectation).to.exist;
      expect(record.status).to.exist;
      expect(record.type).to.exist;
    });
  });

  describe("remove()", function() {
    let record: PursuitDocument;

    beforeEach(async function() {
      record = await Mongoose.Pursuit.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <PursuitDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: PursuitDocument;

    beforeEach(async function() {
      record = await Mongoose.Pursuit.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        brokerProposedPrice: chance.integer(),
        clientCompanyId: chance.hash(),
        clientContactId: chance.hash(),
        commissionAmount: chance.integer(),
        createdDate: chance.hash(),
        lastModifiedDate: chance.hash(),
        name: chance.hash(),
        probability: chance.integer(),
        propertyId: chance.hash(),
        recordTypeId: chance.hash(),
        sellerPriceExpectation: chance.integer(),
        status: chance.hash(),
        type: chance.hash()
      };

      record = <PursuitDocument> await permissions.update(record, params, {}, user);

      expect(record.brokerProposedPrice).to.eql(params.brokerProposedPrice);
      expect(record.clientCompanyId).to.eql(params.clientCompanyId);
      expect(record.clientContactId).to.eql(params.clientContactId);
      expect(record.commissionAmount).to.eql(params.commissionAmount);
      expect(record.createdDate).to.eql(params.createdDate);
      expect(record.lastModifiedDate).to.eql(params.lastModifiedDate);
      expect(record.name).to.eql(params.name);
      expect(record.probability).to.eql(params.probability);
      expect(record.propertyId).to.eql(params.propertyId);
      expect(record.recordTypeId).to.eql(params.recordTypeId);
      expect(record.sellerPriceExpectation).to.eql(params.sellerPriceExpectation);
      expect(record.status).to.eql(params.status);
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
