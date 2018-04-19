import { expect } from "chai";
import { Chance } from "chance";

import { Mongoose, UserDocument, BuyersNeedDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();

describe("express/routes/buyersNeedsRouter.ts", function() {
  let admin: UserDocument;
  let buyersNeed: BuyersNeedDocument;

  beforeEach(async function() {
    admin = await Mongoose.User.mock();
    buyersNeed = await Mongoose.BuyersNeed.mock();
  });

  describe("GET /buyers-needs", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/buyers-needs";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /buyers-needs/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/buyers-needs/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /buyers-needs", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/buyers-needs";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /buyers-needs/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/buyers-needs/" + buyersNeed._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /buyers-needs/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/buyers-needs/" + buyersNeed._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /buyers-needs/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/buyers-needs/" + buyersNeed._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
