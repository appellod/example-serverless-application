import { expect } from "chai";
import { Chance } from "chance";

import { User } from "../../../../src/common/postgres";
import { koa } from "../../../../src/microservices/rest";
import { UserMock } from "../../../common/postgres/mocks";
import { RequestHelper } from "../../../request-helper";

const chance = new Chance();
const requestHelper = new RequestHelper(koa.server);

describe("microservices/rest/controllers/groups.ts", function() {
  let user: User;

  beforeEach(async function() {
    user = await UserMock.insert({ level: 1 });
  });

  describe("GET /users", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/v1/users";
      const params: any = null;

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /users/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/v1/users/count";
      const params: any = null;

      const res = await requestHelper.request(method, path, params, user);

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

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /users/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/v1/users/" + user.id;
      const params: any = null;

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("PUT /users/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/v1/users/" + user.id;
      const params = {
        email: chance.email(),
        level: user.level + 1
      };

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("DELETE /users/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/v1/users/" + user.id;
      const params: any = null;

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /users/:id/friends", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/v1/users/" + user.id + "/friends";
      const params = null;

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /users/:id/friends", function() {
    it("returns a success response", async function() {
      const child = await UserMock.insert();

      const method = "post";
      const path = "/v1/users/" + user.id + "/friends";
      const params = {
        childIds: [child.id]
      };

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("DELETE /users/:id/friends", function() {
    it("returns a success response", async function() {
      const child = await UserMock.insert();

      const method = "delete";
      const path = "/v1/users/" + user.id + "/friends";
      const params = {
        childIds: [child.id]
      };

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /users/:id/ignored-users", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/v1/users/" + user.id + "/ignored-users";
      const params = null;

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /users/:id/ignored-users", function() {
    it("returns a success response", async function() {
      const child = await UserMock.insert();

      const method = "post";
      const path = "/v1/users/" + user.id + "/ignored-users";
      const params = {
        childIds: [child.id]
      };

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("DELETE /users/:id/ignored-users", function() {
    it("returns a success response", async function() {
      const child = await UserMock.insert();

      const method = "delete";
      const path = "/v1/users/" + user.id + "/ignored-users";
      const params = {
        childIds: [child.id]
      };

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });
});
