import { expect } from "chai";
import { Chance } from "chance";

import { Mongoose, UserDocument, DealPartyDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();

describe("express/routes/dealPartiesRouter.ts", function() {
  let admin: UserDocument;
  let dealParty: DealPartyDocument;

  beforeEach(async function() {
    admin = await Mongoose.User.mock();
    dealParty = await Mongoose.DealParty.mock({ ownerId: admin._id });
  });

  describe("GET /deal-parties", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/deal-parties";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /deal-parties/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/deal-parties/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /deal-parties", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/deal-parties";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /deal-parties/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/deal-parties/" + dealParty._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /deal-parties/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/deal-parties/" + dealParty._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /deal-parties/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/deal-parties/" + dealParty._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
