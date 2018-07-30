import { expect } from "chai";
import { Chance } from "chance";

import { Group, GroupDocument, User, UserDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper();
const chance = new Chance();

describe("express/routes/groupsRouter.ts", function() {
  let admin: UserDocument;
  let group: GroupDocument;

  beforeEach(async function() {
    admin = await User.mock({ level: 1 });
    group = await Group.mock();
  });

  describe("GET /groups", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/groups";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /groups/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/groups/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /groups", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/groups";
      const params = {
        isPrivate: chance.bool()
      };

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /groups/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/groups/" + group._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /groups/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/groups/" + group._id;
      const params = {
        isPrivate: chance.bool()
      };

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /groups/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/groups/" + group._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /groups/:id/userIds", function() {
    it ("returns a success response", async function() {
      const method = "delete";
      const path = "/groups/" + group._id + "/userIds";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /groups/:id/userIds/:userIds", function() {
    it ("returns a success response", async function() {
      const method = "post";
      const path = "/groups/" + group._id + "/userIds/" + admin._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /groups/:id/userIds/:userIds", function() {
    it ("returns a success response", async function() {
      const method = "delete";
      const path = "/groups/" + group._id + "/userIds/" + admin._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
