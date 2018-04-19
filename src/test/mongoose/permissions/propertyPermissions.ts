import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, PropertyDocument, PropertyPermissions, Property } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new PropertyPermissions();

describe("mongoose/permissions/contactGroupPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        addressString: chance.hash(),
        buildingLocation: chance.hash(),
        category: chance.hash(),
        class: chance.hash(),
        daysOnMarket: chance.integer(),
        defaultImageAttachmentId: chance.hash(),
        defaultImageUrl: chance.hash(),
        description: chance.hash(),
        forSale: chance.bool(),
        imageLoaded: chance.bool(),
        landAcres: chance.hash(),
        landSquareFeet: chance.hash(),
        latitude: chance.integer(),
        listingDate: chance.hash(),
        listingId: chance.hash(),
        longitude: chance.integer(),
        market: chance.hash(),
        name: chance.hash(),
        occupancy: chance.hash(),
        parcelNumber: chance.hash(),
        parkingRatio: chance.hash(),
        parkingSpaces: chance.hash(),
        primaryUse: chance.hash(),
        recentlySold: chance.bool(),
        recordTypeId: chance.hash(),
        saleDate: chance.hash(),
        salePrice: chance.hash(),
        squareFootage: chance.hash(),
        state: chance.hash(),
        status: chance.hash(),
        stories: chance.hash(),
        street: chance.hash(),
        submarket: chance.hash(),
        tenancy: chance.hash(),
        type: chance.hash(),
        units: chance.hash(),
        usesBackUpImage: chance.bool(),
        yearBuilt: chance.hash(),
        yearRenovated: chance.hash(),
        zoning: chance.hash()
      };

      const record = <PropertyDocument> await permissions.create(params, {}, user);

      expect(record.addressString).to.eql(params.addressString);
      expect(record.buildingLocation).to.eql(params.buildingLocation);
      expect(record.category).to.eql(params.category);
      expect(record.class).to.eql(params.class);
      expect(record.daysOnMarket).to.eql(params.daysOnMarket);
      expect(record.defaultImageAttachmentId).to.eql(params.defaultImageAttachmentId);
      expect(record.defaultImageUrl).to.eql(params.defaultImageUrl);
      expect(record.description).to.eql(params.description);
      expect(record.forSale).to.eql(params.forSale);
      expect(record.imageLoaded).to.eql(params.imageLoaded);
      expect(record.landAcres).to.eql(params.landAcres);
      expect(record.landSquareFeet).to.eql(params.landSquareFeet);
      expect(record.latitude).to.eql(params.latitude);
      expect(record.listingDate).to.eql(params.listingDate);
      expect(record.listingId).to.eql(params.listingId);
      expect(record.longitude).to.eql(params.longitude);
      expect(record.market).to.eql(params.market);
      expect(record.name).to.eql(params.name);
      expect(record.occupancy).to.eql(params.occupancy);
      expect(record.parcelNumber).to.eql(params.parcelNumber);
      expect(record.parkingRatio).to.eql(params.parkingRatio);
      expect(record.parkingSpaces).to.eql(params.parkingSpaces);
      expect(record.primaryUse).to.eql(params.primaryUse);
      expect(record.recentlySold).to.eql(params.recentlySold);
      expect(record.recordTypeId).to.eql(params.recordTypeId);
      expect(record.saleDate).to.eql(params.saleDate);
      expect(record.salePrice).to.eql(params.salePrice);
      expect(record.squareFootage).to.eql(params.squareFootage);
      expect(record.state).to.eql(params.state);
      expect(record.status).to.eql(params.status);
      expect(record.stories).to.eql(params.stories);
      expect(record.street).to.eql(params.street);
      expect(record.submarket).to.eql(params.submarket);
      expect(record.tenancy).to.eql(params.tenancy);
      expect(record.type).to.eql(params.type);
      expect(record.units).to.eql(params.units);
      expect(record.usesBackUpImage).to.eql(params.usesBackUpImage);
      expect(record.yearBuilt).to.eql(params.yearBuilt);
      expect(record.yearRenovated).to.eql(params.yearRenovated);
      expect(record.zoning).to.eql(params.zoning);
    });
  });

  describe("read()", function() {
    let record: PropertyDocument;

    beforeEach(async function() {
      record = await Mongoose.Property.mock({
        addressString: chance.hash(),
        buildingLocation: chance.hash(),
        category: chance.hash(),
        class: chance.hash(),
        daysOnMarket: chance.integer(),
        defaultImageAttachmentId: chance.hash(),
        defaultImageUrl: chance.hash(),
        description: chance.hash(),
        forSale: chance.bool(),
        imageLoaded: chance.bool(),
        landAcres: chance.hash(),
        landSquareFeet: chance.hash(),
        latitude: chance.integer(),
        listingDate: chance.hash(),
        listingId: chance.hash(),
        longitude: chance.integer(),
        market: chance.hash(),
        name: chance.hash(),
        occupancy: chance.hash(),
        parcelNumber: chance.hash(),
        parkingRatio: chance.hash(),
        parkingSpaces: chance.hash(),
        primaryUse: chance.hash(),
        recentlySold: chance.bool(),
        recordTypeId: chance.hash(),
        saleDate: chance.hash(),
        salePrice: chance.hash(),
        squareFootage: chance.hash(),
        state: chance.hash(),
        status: chance.hash(),
        stories: chance.hash(),
        street: chance.hash(),
        submarket: chance.hash(),
        tenancy: chance.hash(),
        type: chance.hash(),
        units: chance.hash(),
        usesBackUpImage: chance.bool(),
        yearBuilt: chance.hash(),
        yearRenovated: chance.hash(),
        zoning: chance.hash()
      });
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <PropertyDocument> await permissions.read(record, user);

      expect(record.addressString).to.exist;
      expect(record.buildingLocation).to.exist;
      expect(record.category).to.exist;
      expect(record.class).to.exist;
      expect(record.daysOnMarket).to.exist;
      expect(record.defaultImageAttachmentId).to.exist;
      expect(record.defaultImageUrl).to.exist;
      expect(record.description).to.exist;
      expect(record.forSale).to.exist;
      expect(record.imageLoaded).to.exist;
      expect(record.landAcres).to.exist;
      expect(record.landSquareFeet).to.exist;
      expect(record.latitude).to.exist;
      expect(record.listingDate).to.exist;
      expect(record.listingId).to.exist;
      expect(record.longitude).to.exist;
      expect(record.market).to.exist;
      expect(record.name).to.exist;
      expect(record.occupancy).to.exist;
      expect(record.parcelNumber).to.exist;
      expect(record.parkingRatio).to.exist;
      expect(record.parkingSpaces).to.exist;
      expect(record.primaryUse).to.exist;
      expect(record.recentlySold).to.exist;
      expect(record.recordTypeId).to.exist;
      expect(record.saleDate).to.exist;
      expect(record.salePrice).to.exist;
      expect(record.squareFootage).to.exist;
      expect(record.state).to.exist;
      expect(record.status).to.exist;
      expect(record.stories).to.exist;
      expect(record.street).to.exist;
      expect(record.submarket).to.exist;
      expect(record.tenancy).to.exist;
      expect(record.type).to.exist;
      expect(record.units).to.exist;
      expect(record.usesBackUpImage).to.exist;
      expect(record.yearBuilt).to.exist;
      expect(record.yearRenovated).to.exist;
      expect(record.zoning).to.exist;
    });
  });

  describe("remove()", function() {
    let record: PropertyDocument;

    beforeEach(async function() {
      record = await Mongoose.Property.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <PropertyDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: PropertyDocument;

    beforeEach(async function() {
      record = await Mongoose.Property.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        addressString: chance.hash(),
        buildingLocation: chance.hash(),
        category: chance.hash(),
        class: chance.hash(),
        daysOnMarket: chance.integer(),
        defaultImageAttachmentId: chance.hash(),
        defaultImageUrl: chance.hash(),
        description: chance.hash(),
        forSale: chance.bool(),
        imageLoaded: chance.bool(),
        landAcres: chance.hash(),
        landSquareFeet: chance.hash(),
        latitude: chance.integer(),
        listingDate: chance.hash(),
        listingId: chance.hash(),
        longitude: chance.integer(),
        market: chance.hash(),
        name: chance.hash(),
        occupancy: chance.hash(),
        parcelNumber: chance.hash(),
        parkingRatio: chance.hash(),
        parkingSpaces: chance.hash(),
        primaryUse: chance.hash(),
        recentlySold: chance.bool(),
        recordTypeId: chance.hash(),
        saleDate: chance.hash(),
        salePrice: chance.hash(),
        squareFootage: chance.hash(),
        state: chance.hash(),
        status: chance.hash(),
        stories: chance.hash(),
        street: chance.hash(),
        submarket: chance.hash(),
        tenancy: chance.hash(),
        type: chance.hash(),
        units: chance.hash(),
        usesBackUpImage: chance.bool(),
        yearBuilt: chance.hash(),
        yearRenovated: chance.hash(),
        zoning: chance.hash()
      };

      record = <PropertyDocument> await permissions.update(record, params, {}, user);

      expect(record.addressString).to.eql(params.addressString);
      expect(record.buildingLocation).to.eql(params.buildingLocation);
      expect(record.category).to.eql(params.category);
      expect(record.class).to.eql(params.class);
      expect(record.daysOnMarket).to.eql(params.daysOnMarket);
      expect(record.defaultImageAttachmentId).to.eql(params.defaultImageAttachmentId);
      expect(record.defaultImageUrl).to.eql(params.defaultImageUrl);
      expect(record.description).to.eql(params.description);
      expect(record.forSale).to.eql(params.forSale);
      expect(record.imageLoaded).to.eql(params.imageLoaded);
      expect(record.landAcres).to.eql(params.landAcres);
      expect(record.landSquareFeet).to.eql(params.landSquareFeet);
      expect(record.latitude).to.eql(params.latitude);
      expect(record.listingDate).to.eql(params.listingDate);
      expect(record.listingId).to.eql(params.listingId);
      expect(record.longitude).to.eql(params.longitude);
      expect(record.market).to.eql(params.market);
      expect(record.name).to.eql(params.name);
      expect(record.occupancy).to.eql(params.occupancy);
      expect(record.parcelNumber).to.eql(params.parcelNumber);
      expect(record.parkingRatio).to.eql(params.parkingRatio);
      expect(record.parkingSpaces).to.eql(params.parkingSpaces);
      expect(record.primaryUse).to.eql(params.primaryUse);
      expect(record.recentlySold).to.eql(params.recentlySold);
      expect(record.recordTypeId).to.eql(params.recordTypeId);
      expect(record.saleDate).to.eql(params.saleDate);
      expect(record.salePrice).to.eql(params.salePrice);
      expect(record.squareFootage).to.eql(params.squareFootage);
      expect(record.state).to.eql(params.state);
      expect(record.status).to.eql(params.status);
      expect(record.stories).to.eql(params.stories);
      expect(record.street).to.eql(params.street);
      expect(record.submarket).to.eql(params.submarket);
      expect(record.tenancy).to.eql(params.tenancy);
      expect(record.type).to.eql(params.type);
      expect(record.units).to.eql(params.units);
      expect(record.usesBackUpImage).to.eql(params.usesBackUpImage);
      expect(record.yearBuilt).to.eql(params.yearBuilt);
      expect(record.yearRenovated).to.eql(params.yearRenovated);
      expect(record.zoning).to.eql(params.zoning);
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
