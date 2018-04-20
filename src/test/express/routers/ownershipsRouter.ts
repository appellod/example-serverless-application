import { expect } from "chai";
import { Chance } from "chance";

import { Mongoose, UserDocument, OwnershipDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();

describe("express/routes/ownershipsRouter.ts", function() {
  let admin: UserDocument;
  let ownership: OwnershipDocument;

  beforeEach(async function() {
    admin = await Mongoose.User.mock();
    ownership = await Mongoose.Ownership.mock({ ownerId: admin._id });
  });

  describe("GET /ownerships", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/ownerships";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /ownerships/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/ownerships/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /ownerships", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/ownerships";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /ownerships/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/ownerships/" + ownership._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /ownerships/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/ownerships/" + ownership._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /ownerships/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/ownerships/" + ownership._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
