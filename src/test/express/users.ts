import * as chai from "chai";
import { Chance } from "chance";

import { Mongoose } from "../../mongoose";
import { UserDocument, AuthToken } from "../../mongoose/models/user";
import { ApiHelper } from "./api-helper";

const index = require("../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();
const expect = chai.expect;

describe("express/users.ts", function() {
  describe("GET /users", function() {
    beforeEach(async function() {
      await Mongoose.User.mock({});
    });

    context("when the user is an admin", function() {
      it("returns all users", async function() {
        const method = "get";
        const path = "/users";
        const params: any = null;

        const res = await apiHelper.request(method, path, params, "admin@example.com");

        expect(res.status).to.eq(200);
        expect(res.body.users.length).to.eql(3);

        expect(res.body.users[0].email).to.exist;
        expect(res.body.users[0].level).to.exist;
        expect(res.body.users[0].password).to.be.undefined;
        expect(res.body.users[0].resetHash).to.be.undefined;
        expect(res.body.users[0].tokens).to.be.undefined;
      });
    });

    context("when the user is not an admin", function() {
      it("returns all users", async function() {
        const method = "get";
        const path = "/users";
        const params: any = null;

        const res = await apiHelper.request(method, path, params, "test@example.com");

        expect(res.status).to.eq(200);
        expect(res.body.users.length).to.eql(3);

        // their own record
        expect(res.body.users[0].email).to.exist;
        expect(res.body.users[0].level).to.exist;
        expect(res.body.users[0].password).to.be.undefined;
        expect(res.body.users[0].resetHash).to.be.undefined;
        expect(res.body.users[0].tokens).to.be.undefined;

        // another record
        expect(res.body.users[1].email).to.exist;
        expect(res.body.users[1].level).to.be.undefined;
        expect(res.body.users[1].password).to.be.undefined;
        expect(res.body.users[1].resetHash).to.be.undefined;
        expect(res.body.users[1].tokens).to.be.undefined;
      });
    });
  });

  describe("POST /users", function() {
    const method = "post";
    const path = "/users";
    const params = {
      email: chance.email(),
      password: chance.hash()
    };

    context("when user is an admin", function() {
      it("creates a new user", async function() {
        const res = await apiHelper.request(method, path, params, "admin@example.com");

        expect(res.status).to.eq(200);
        expect(res.body.user.email).to.eq(params.email);
        expect(res.body.user.level).to.eq(0);
        expect(res.body.user.password).to.not.eq(params.password);
        expect(res.body.user.resetHash).to.be.undefined;
        expect(res.body.user.tokens).to.be.undefined;
      });
    });

    context("when user is not an admin", function() {
      it("returns an error", async function() {
        const res = await apiHelper.request(method, path, params, "test@example.com");

        expect(res.status).to.eq(400);
        expect(res.body.error).to.eq("You do not have permission to perform this action.");
      });
    });
  });

  describe("GET /users/:id", function() {
    let user: UserDocument;

    beforeEach(async function() {
      user = await Mongoose.User.mock({});
    });

    context("when user is an admin", function() {
      it ("returns the record", async function() {
        const method = "get";
        const path = "/users/" + user._id;
        const params: any = null;

        const res = await apiHelper.request(method, path, params, "admin@example.com");

        expect(res.status).to.eq(200);
        expect(res.body.user._id).to.eq(user._id.toString());
        expect(res.body.user.email).to.eq(user.email);
        expect(res.body.user.level).to.eq(user.level);
        expect(res.body.user.password).to.be.undefined;
        expect(res.body.user.resetHash).to.be.undefined;
        expect(res.body.user.tokens).to.be.undefined;
      });
    });

    context("when user is not an admin", function() {
      context("when user is accessing their own record", function() {
        it ("returns the record", async function() {
          const method = "get";
          const path = "/users/" + user._id;
          const params: any = null;

          const res = await apiHelper.request(method, path, params, user.email);

          expect(res.status).to.eq(200);
          expect(res.body.user._id).to.eq(user._id.toString());
          expect(res.body.user.email).to.eq(user.email);
          expect(res.body.user.level).to.eq(user.level);
          expect(res.body.user.password).to.be.undefined;
          expect(res.body.user.resetHash).to.be.undefined;
          expect(res.body.user.tokens).to.be.undefined;
        });
      });

      context("when user is accessing another user's record", function() {
        it ("returns the record", async function() {
          const method = "get";
          const path = "/users/" + user._id;
          const params: any = null;

          const res = await apiHelper.request(method, path, params, "test@example.com");

          expect(res.status).to.eq(200);
          expect(res.body.user._id).to.eq(user._id.toString());
          expect(res.body.user.email).to.eq(user.email);
          expect(res.body.user.level).to.be.undefined;
          expect(res.body.user.password).to.be.undefined;
          expect(res.body.user.resetHash).to.be.undefined;
          expect(res.body.user.tokens).to.be.undefined;
        });
      });
    });
  });

  describe("PUT /users/:id", function() {
    let user: UserDocument;

    beforeEach(async function() {
      user = await Mongoose.User.mock({});
    });

    context("when the user is an admin", function() {
      it("updates and returns the user", async function() {
        const method = "put";
        const path = "/users/" + user._id;
        const params = {
          email: chance.email(),
          level: user.level + 1
        };

        const res = await apiHelper.request(method, path, params, "admin@example.com");

        expect(res.status).to.eq(200);
        expect(res.body.user._id).to.eq(user._id.toString());
        expect(res.body.user.email).to.eq(params.email);
        expect(res.body.user.level).to.eq(params.level);
        expect(res.body.user.password).to.be.undefined;
        expect(res.body.user.resetHash).to.be.undefined;
        expect(res.body.user.tokens).to.be.undefined;
      });
    });

    context("when the user is not an admin", function() {
      context("when user is updating their own record", function() {
        it("updates and returns the user", async function() {
          const method = "put";
          const path = "/users/" + user._id;
          const params = {
            email: chance.email(),
            level: user.level + 1
          };

          const res = await apiHelper.request(method, path, params, user.email);

          expect(res.status).to.eq(200);
          expect(res.body.user._id).to.eq(user._id.toString());
          expect(res.body.user.email).to.eq(params.email);
          expect(res.body.user.level).to.eq(user.level);
          expect(res.body.user.password).to.be.undefined;
          expect(res.body.user.resetHash).to.be.undefined;
          expect(res.body.user.tokens).to.be.undefined;
        });
      });

      context("when user is updating another user's record", function() {
        it ("returns a 400 status", async function() {
          const method = "put";
          const path = "/users/" + user._id;
          const params = {
            email: chance.email(),
            level: user.level + 1
          };

          const res = await apiHelper.request(method, path, params, "test@example.com");

          expect(res.status).to.eq(400);
        });
      });
    });
  });

  describe("DELETE /users/:id", function() {
    let user: UserDocument;

    beforeEach(async function() {
      user = await Mongoose.User.mock({});
    });

    context("when the user is an admin", function() {
      it("returns a 200 status", async function() {
        const method = "delete";
        const path = "/users/" + user._id;
        const params: any = null;

        const res = await apiHelper.request(method, path, params, "admin@example.com");

        expect(res.status).to.eq(200);
      });
    });

    context("when the user is not an admin", function() {
      context("when user is removing their own record", function() {
        it ("returns a 200 status", async function() {
          const method = "delete";
          const path = "/users/" + user._id;
          const params: any = null;

          const res = await apiHelper.request(method, path, params, user.email);

          expect(res.status).to.eq(200);
        });
      });

      context("when user is removing another user's record", function() {
        it ("returns a 400 status", async function() {
          const method = "delete";
          const path = "/users/" + user._id;
          const params: any = null;

          const res = await apiHelper.request(method, path, params, "test@example.com");

          expect(res.status).to.eq(400);
        });
      });
    });
  });
});
