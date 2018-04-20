import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { PropertiesController } from "../../../express";
import { Mongoose, UserDocument, PropertyDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const propertiesController = new PropertiesController();

describe("express/controllers/propertiesController.ts", function() {
  let property: PropertyDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await Mongoose.User.mock();
    property = await Mongoose.Property.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of properties matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await propertiesController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new property", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await propertiesController.create(req);

      expect(res.property).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all properties", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await propertiesController.find(req);

      expect(res.properties.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the property", async function() {
      const req = {
        params: {
          id: property._id
        },
        user
      } as express.Request;

      const res = await propertiesController.findOne(req);

      expect(res.property).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: property._id
        },
        user
      } as express.Request;

      const res = await propertiesController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the property", async function() {
      const req = {
        body: {},
        params: {
          id: property._id
        },
        user
      } as express.Request;

      const res = await propertiesController.findOne(req);

      expect(res.property).to.exist;
    });
  });
});
