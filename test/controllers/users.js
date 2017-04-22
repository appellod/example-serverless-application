"use strict";

const chai = require('chai');
const chance = new require('chance')();

// set up test suite and import models
const bs = require("../bootstrap");
const User = bs.mongoose.model("User");

const expect = chai.expect;

// make API calls a little easier
const api = require("../helpers/api")(bs.config, bs.mongoose);

describe("controllers/users.js", () => {
	describe("GET /users", () => {
		beforeEach((done) => {
			User.mock({}, (user) => {
				return done();
			});
		});

		it("returns all users", (done) => {
			let method = "get";
			let path = "/users";
			let params = null;

			api.request(method, path, params, "test@example.com", (err, res) => {
				expect(res.status).to.eq(200);

				expect(res.body.users.length).to.be.above(0);

				done();
			});
		});
	});

	describe("POST /users", () => {
		it("creates a new user", (done) => {
			let method = "post";
			let path = "/users";
			let params = {
				email: chance.email(),
				level: chance.integer(),
				password: chance.word(),
				resetHash: chance.word()
			};

			api.request(method, path, params, "test@example.com", (err, res) => {
				expect(res.status).to.eq(200);

				expect(res.body.user.email).to.eq(params.email);
				expect(res.body.user.level).to.eq(params.level);
				expect(res.body.user.resetHash).to.eq(params.resetHash);

				done();
			});
		});
	});

	describe("GET /users/:id", () => {
		let user;

		beforeEach((done) => {
			User.mock({}, (err, _user) => {
				user = _user;

				return done();
			});
		});

		it("returns the user", (done) => {
			let method = "get";
			let path = "/users/" + user._id;
			let params = null;

			api.request(method, path, params, "test@example.com", (err, res) => {
				expect(res.status).to.eq(200);

				expect(res.body.user._id).to.eq(user._id.toString());

				done();
			});
		});
	});

	describe("PUT /users/:id", () => {
		let user;

		beforeEach((done) => {
			User.mock({}, (err, _user) => {
				user = _user;

				return done();
			});
		});

		it("updates and returns the user", (done) => {
			let method = "put";
			let path = "/users/" + user._id;
			let params = {
				email: chance.word(),
				level: chance.integer(),
				password: chance.word(),
				resetHash: chance.word()
			};

			api.request(method, path, params, "test@example.com", (err, res) => {
				expect(res.status).to.eq(200);

				expect(res.body.user.email).to.eq(params.email);
				expect(res.body.user.level).to.eq(params.level);
				expect(res.body.user.password).to.eq(params.password);
				expect(res.body.user.resetHash).to.eq(params.resetHash);

				done();
			});
		});
	});

	describe("DELETE /users/:id", () => {
		let user;

		beforeEach((done) => {
			User.mock({}, (err, _user) => {
				user = _user;

				return done();
			});
		});

		it("returns a 200 status", (done) => {
			let method = "delete";
			let path = "/users/" + user._id;
			let params = null;

			api.request(method, path, params, "test@example.com", (err, res) => {
				expect(res.status).to.eq(200);

				done();
			});
		});
	});
});
