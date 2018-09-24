import { User } from "@example/postgres";
import { UserMock } from "@example/postgres/mocks";
import { expect } from "chai";
import { Chance } from "chance";

import { RequestHelper } from "../request-helper";

const chance = new Chance();
const requestHelper = new RequestHelper();

describe("/users", function() {
  let user: User;

  beforeEach(async function() {
    user = await new UserMock({ level: 1 }).create();
  });

  afterEach(async function() {
    await user.$query().deleteById(user.id);
  });

  describe("DELETE /:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/users/" + user.id;
      const params: any = null;

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("DELETE /:id/friends", function() {
    it("returns a success response", async function() {
      const child = await new UserMock().create();

      const method = "delete";
      const path = "/users/" + user.id + "/friends";
      const params = { ids: [child.id] };

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("DELETE /:id/ignored-users", function() {
    it("returns a success response", async function() {
      const child = await new UserMock().create();

      const method = "delete";
      const path = "/users/" + user.id + "/ignored-users";
      const params = { ids: [child.id] };

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/users";
      const params: any = null;

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/users/count";
      const params: any = null;

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/users/" + user.id;
      const params: any = null;

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /:id/friends", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/users/" + user.id + "/friends";
      const params = null;

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("GET /:id/ignored-users", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/users/" + user.id + "/ignored-users";
      const params = null;

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/users";
      const params = {
        email: chance.email(),
        password: chance.hash()
      };

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /:id/friends", function() {
    it("returns a success response", async function() {
      const child = await new UserMock().create();

      const method = "post";
      const path = "/users/" + user.id + "/friends";
      const params = { ids: [child.id] };

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("POST /:id/ignored-users", function() {
    it("returns a success response", async function() {
      const child = await new UserMock().create();

      const method = "post";
      const path = "/users/" + user.id + "/ignored-users";
      const params = { ids: [child.id] };

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });

  describe("PUT /:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/users/" + user.id;
      const params = {
        email: chance.email(),
        level: user.level + 1
      };

      const res = await requestHelper.request(method, path, params, user);

      expect(res.status).to.eql(200);
    });
  });
});
