import { expect } from "chai";
import { Chance } from "chance";

import { Mongoose, UserDocument, OfferDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();

describe("express/routes/offersRouter.ts", function() {
  let admin: UserDocument;
  let offer: OfferDocument;

  beforeEach(async function() {
    admin = await Mongoose.User.mock();
    offer = await Mongoose.Offer.mock({ ownerId: admin._id });
  });

  describe("GET /offers", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/offers";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /offers/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/offers/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /offers", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/offers";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /offers/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/offers/" + offer._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /offers/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/offers/" + offer._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /offers/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/offers/" + offer._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
