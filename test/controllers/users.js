"use strict";

const chai = require('chai');
const chance = new require('chance')();

// set up test suite and import models
const bs = require("../bootstrap");
const User = bs.mongoose.model("User");

const expect = chai.expect;

// make API calls a little easier
const api = require("../helpers/api")(bs.config, bs.mongoose);

describe("controllers/users.js", function() {
	describe("GET /users", function() {
		beforeEach(async function() {
            await User.mock({});
		});

		it("returns all users", async function() {
			const method = "get";
			const path = "/users";
			const params = null;

			const res = await api.request(method, path, params, "test@example.com");
            expect(res.status).to.eq(200);

			expect(res.body.users.length).to.be.above(0);
		});
	});

	describe("POST /users", function() {
		it("creates a new user", async function() {
			const method = "post";
			const path = "/users";
			const params = {
        		email: chance.email(),
    			password: chance.hash()
      		};

            const res = await api.request(method, path, params, "test@example.com");
            expect(res.status).to.eq(200);

			expect(res.body.user.email).to.eq(params.email);
			expect(res.body.user.password).to.not.eq(params.password);
		});
	});

	describe("GET /users/:id", function() {
		let user;

		beforeEach(async function() {
            user = await User.mock({});
		});

		it("returns the user", async function() {
			const method = "get";
			const path = "/users/" + user._id;
			const params = null;

            const res = await api.request(method, path, params, "test@example.com");
            expect(res.status).to.eq(200);

			expect(res.body.user._id).to.eq(user._id.toString());
		});
	});

	describe("PUT /users/:id", function() {
		let user;

		beforeEach(async function() {
            user = await User.mock({});
		});

		it("updates and returns the user", async function() {
			const method = "put";
			const path = "/users/" + user._id;
			const params = {
				email: chance.email(),
			};

            const res = await api.request(method, path, params, "test@example.com");
            expect(res.status).to.eq(200);

			expect(res.body.user.email).to.eq(params.email);
		});
	});

	describe("DELETE /users/:id", function() {
		let user;

		beforeEach(async function() {
            user = await User.mock({});
		});

		it("returns a 200 status", async function() {
			const method = "delete";
			const path = "/users/" + user._id;
			const params = null;

            const res = await api.request(method, path, params, "test@example.com");
            expect(res.status).to.eq(200);
		});
	});
});
