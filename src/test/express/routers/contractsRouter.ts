import { expect } from "chai";
import { Chance } from "chance";

import { Mongoose, UserDocument, ContractDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();

describe("express/routes/contractsRouter.ts", function() {
  let admin: UserDocument;
  let contract: ContractDocument;

  beforeEach(async function() {
    admin = await Mongoose.User.mock();
    contract = await Mongoose.Contract.mock({ ownerId: admin._id });
  });

  describe("GET /contracts", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/contracts";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /contracts/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/contracts/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /contracts", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/contracts";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /contracts/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/contracts/" + contract._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /contracts/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/contracts/" + contract._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /contracts/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/contracts/" + contract._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
