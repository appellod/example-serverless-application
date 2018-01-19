import * as chai from "chai";
import { Chance } from "chance";

import { Mongoose } from "../../../mongoose";
import { UserDocument } from "../../../mongoose/models/user";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();
const expect = chai.expect;

describe("express/routes/users.ts", function() {
  let admin: UserDocument;

  beforeEach(async function() {
    admin = await Mongoose.User.mock();
  });

  describe("GET /users", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/users";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /users", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/users";
      const params = {
        email: chance.email(),
        password: chance.hash()
      };

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /users/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/users/" + admin._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /users/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/users/" + admin._id;
      const params = {
        email: chance.email(),
        level: admin.level + 1
      };

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /users/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/users/" + admin._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
