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
		beforeEach(function(done) {
			User.mock({}, (err, _user) => {
				return done();
			});
		});

		it("returns all users", function(done) {
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

	describe("POST /users", function() {
		it("creates a new user", function(done) {
			let method = "post";
			let path = "/users";
			let params = {
    		email: chance.email(),
				password: chance.hash()
  		};

			api.request(method, path, params, "test@example.com", (err, res) => {
				expect(res.status).to.eq(200);

				expect(res.body.user.email).to.eq(params.email);
				expect(res.body.user.password).to.not.eq(params.password);

				done();
			});
		});
	});

	describe("GET /users/:id", function() {
		let user;

		beforeEach(function(done) {
			User.mock({}, (err, _user) => {
				user = _user;

				return done();
			});
		});

		it("returns the user", function(done) {
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

	describe("PUT /users/:id", function() {
		let user;

		beforeEach(function(done) {
			User.mock({}, (err, _user) => {
				user = _user;

				return done();
			});
		});

		it("updates and returns the user", function(done) {
			let method = "put";
			let path = "/users/" + user._id;
			let params = {
				email: chance.email(),
			};

			api.request(method, path, params, "test@example.com", (err, res) => {
				expect(res.status).to.eq(200);

				expect(res.body.user.email).to.eq(params.email);

				done();
			});
		});
	});

	describe("DELETE /users/:id", function() {
		let user;

		beforeEach(function(done) {
			User.mock({}, (err, _user) => {
				user = _user;

				return done();
			});
		});

		it("returns a 200 status", function(done) {
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
