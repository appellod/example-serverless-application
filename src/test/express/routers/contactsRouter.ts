import { expect } from "chai";
import { Chance } from "chance";

import { Mongoose, UserDocument, ContactDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();

describe("express/routes/contactsRouter.ts", function() {
  let admin: UserDocument;
  let contact: ContactDocument;

  beforeEach(async function() {
    admin = await Mongoose.User.mock();
    contact = await Mongoose.Contact.mock({ ownerId: admin._id });
  });

  describe("GET /contacts", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/contacts";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /contacts/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/contacts/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /contacts", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/contacts";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /contacts/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/contacts/" + contact._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /contacts/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/contacts/" + contact._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /contacts/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/contacts/" + contact._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
