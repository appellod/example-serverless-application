import { expect } from "chai";
import { Chance } from "chance";

import { Group, GroupDocument, User, UserDocument } from "../../../../src/common/mongo";
import { koa } from "../../../../src/microservices/rest";
import { RequestHelper } from "../../../request-helper";

const chance = new Chance();
const requestHelper = new RequestHelper(koa.server);

describe("microservices/rest/routes/groups.ts", function() {
  let admin: UserDocument;
  let group: GroupDocument;

  beforeEach(async function() {
    admin = await User.mock({ level: 1 });
    group = await Group.mock();
  });

  describe("GET /groups", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/v1/groups";
      const params: any = null;

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /groups/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/v1/groups/count";
      const params: any = null;

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /groups", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/v1/groups";
      const params = {
        isPrivate: chance.bool()
      };

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /groups/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/v1/groups/" + group._id;
      const params: any = null;

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });

  describe("PUT /groups/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/v1/groups/" + group._id;
      const params = {
        isPrivate: chance.bool()
      };

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });

  describe("DELETE /groups/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/v1/groups/" + group._id;
      const params: any = null;

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });

  describe("DELETE /groups/:id/userIds", function() {
    it ("returns a success response", async function() {
      const method = "delete";
      const path = "/v1/groups/" + group._id + "/userIds";
      const params: any = null;

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /groups/:id/userIds/:userIds", function() {
    it ("returns a success response", async function() {
      const method = "post";
      const path = "/v1/groups/" + group._id + "/userIds/" + admin._id;
      const params: any = null;

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });

  describe("DELETE /groups/:id/userIds/:userIds", function() {
    it ("returns a success response", async function() {
      const method = "delete";
      const path = "/v1/groups/" + group._id + "/userIds/" + admin._id;
      const params: any = null;

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });
});
