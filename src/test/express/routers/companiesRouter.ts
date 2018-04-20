import { expect } from "chai";
import { Chance } from "chance";

import { Mongoose, UserDocument, CompanyDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();

describe("express/routes/companiesRouter.ts", function() {
  let admin: UserDocument;
  let company: CompanyDocument;

  beforeEach(async function() {
    admin = await Mongoose.User.mock();
    company = await Mongoose.Company.mock({ ownerId: admin._id });
  });

  describe("GET /companies", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/companies";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /companies/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/companies/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /companies", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/companies";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /companies/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/companies/" + company._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /companies/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/companies/" + company._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /companies/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/companies/" + company._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
