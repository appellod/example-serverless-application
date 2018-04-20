import { expect } from "chai";
import { Chance } from "chance";

import { Mongoose, UserDocument, CompDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();

describe("express/routes/compsRouter.ts", function() {
  let admin: UserDocument;
  let comp: CompDocument;

  beforeEach(async function() {
    admin = await Mongoose.User.mock();
    comp = await Mongoose.Comp.mock({ ownerId: admin._id });
  });

  describe("GET /comps", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/comps";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /comps/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/comps/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /comps", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/comps";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /comps/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/comps/" + comp._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /comps/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/comps/" + comp._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /comps/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/comps/" + comp._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
