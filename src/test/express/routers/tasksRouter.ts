import { expect } from "chai";
import { Chance } from "chance";

import { Mongoose, UserDocument, TaskDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();

describe("express/routes/tasksRouter.ts", function() {
  let admin: UserDocument;
  let task: TaskDocument;

  beforeEach(async function() {
    admin = await Mongoose.User.mock();
    task = await Mongoose.Task.mock({ ownerId: admin._id });
  });

  describe("GET /tasks", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/tasks";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /tasks/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/tasks/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /tasks", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/tasks";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /tasks/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/tasks/" + task._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /tasks/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/tasks/" + task._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /tasks/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/tasks/" + task._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
