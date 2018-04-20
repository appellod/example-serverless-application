import { expect } from "chai";
import { Chance } from "chance";

import { Mongoose, UserDocument, PropertyDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();

describe("express/routes/propertiesRouter.ts", function() {
  let admin: UserDocument;
  let property: PropertyDocument;

  beforeEach(async function() {
    admin = await Mongoose.User.mock();
    property = await Mongoose.Property.mock({ ownerId: admin._id });
  });

  describe("GET /properties", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/properties";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /properties/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/properties/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /properties", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/properties";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /properties/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/properties/" + property._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /properties/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/properties/" + property._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /properties/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/properties/" + property._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
