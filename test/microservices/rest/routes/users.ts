import { expect } from "chai";
import { Chance } from "chance";

import { User, UserDocument } from "../../../../src/common/mongo";
import { koa } from "../../../../src/microservices/rest";
import { RequestHelper } from "../../../request-helper";

const chance = new Chance();
const requestHelper = new RequestHelper(koa.server);

describe("microservices/rest/controllers/groups.ts", function() {
  let admin: UserDocument;

  beforeEach(async function() {
    admin = await User.mock({ level: 1 });
  });

  describe("GET /users", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/v1/users";
      const params: any = null;

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /users/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/v1/users/count";
      const params: any = null;

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /users", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/v1/users";
      const params = {
        email: chance.email(),
        password: chance.hash()
      };

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /users/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/v1/users/" + admin._id;
      const params: any = null;

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });

  describe("PUT /users/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/v1/users/" + admin._id;
      const params = {
        email: chance.email(),
        level: admin.level + 1
      };

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });

  describe("DELETE /users/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/v1/users/" + admin._id;
      const params: any = null;

      const res = await requestHelper.request(method, path, params, admin);

      expect(res.status).to.eql(200);
    });
  });
});
