"use strict";

const chai = require('chai');

// set up test suite and import models
const bs = require("../bootstrap");
const User = bs.mongoose.model("User");

const expect = chai.expect;

// make API calls a little easier
const api = require("../helpers/api")(bs.config, bs.mongoose);

describe("controllers/authentication.js", function() {
	describe("GET /authentication/availability", function() {
		context("when email is available", function() {
			it("returns isAvailable set to true", function(done) {
				let method = "get";
				let path = "/authentication/availability";
				let params = {
					email: "available@example.com"
				};

				api.request(method, path, params, null, (err, res) => {
					expect(res.body.isAvailable).to.be.true;

					done();
				});
			});
		});

		context("when email is unavailable", function() {
			beforeEach(function(done) {
				User.mock({ email: "taken@example.com" }, (err, user) => {
					done();
				});
			});

			it("returns isAvailable set to false", function(done) {
				let method = "get";
				let path = "/authentication/availability";
				let params = {
					email: "taken@example.com"
				};

				api.request(method, path, params, null, (err, res) => {
					expect(res.body.isAvailable).to.be.false;

					done();
				});
			});
		});
	});

	describe("POST /authentication/signup", function() {
		it("returns the user and access token", function(done) {
			let method = "post";
			let path = "/authentication/signup";
			let params = {
				email: "test@example.com",
				password: "password"
			};

			api.request(method, path, params, null, (err, res) => {
				expect(res.body.user).to.be.defined;
				expect(res.body.token).to.be.defined;

				done();
			});
		});
	});

	describe("POST /authentication/login", function() {
		let user;

		beforeEach(function(done) {
			User.mock({ password: "password" }, (err, _user) => {
				user = _user;

				done();
			});
		});

		context("when credentials are correct", function() {
			it("returns the user and access token", function(done) {
				let method = "post";
				let path = "/authentication/login";
				let params = {
					email: user.email,
					password: "password"
				};

				api.request(method, path, params, null, (err, res) => {
					expect(res.body.user).to.be.defined;
					expect(res.body.token).to.be.defined;

					done();
				});
			});
		});

		context("when credentials are incorrect", function() {
			it("returns an error message", function(done) {
				let method = "post";
				let path = "/authentication/login";
				let params = {
					email: user.email,
					password: "wrong"
				};

				api.request(method, path, params, null, (err, res) => {
					expect(res.status).to.eq(400);
					expect(res.body.error).to.be.defined;

					done();
				});
			});
		});
	});

	describe("DELETE /authentication/logout", function() {
		let user;

		beforeEach(function(done) {
			User.mock({}, (err, _user) => {
				_user.login((err, _user) => {
					user = _user;

					done();
				});
			});
		});

		it("returns a 200 status", function(done) {
			let method = "delete";
			let path = "/authentication/logout";
			let params = null;

			api.request(method, path, params, user.email, (err, res) => {
				expect(res.status).to.eq(200);

				done();
			});
		});
	});

	describe("POST /authentication/request-password-reset", function() {
		let user;

		beforeEach(function(done) {
			User.mock({}, (err, _user) => {
				_user.login((err, _user) => {
					user = _user;

					done();
				});
			});
		});

		it("returns a 200 status", function(done) {
			let method = "post";
			let path = "/authentication/request-password-reset";
			let params = {
				email: user.email
			};

			api.request(method, path, params, null, (err, res) => {
				expect(res.status).to.eq(200);

				done();
			});
		});
	});

	describe("POST /authentication/reset-password", function() {
		let user;

		beforeEach(function(done) {
			User.mock({}, (err, _user) => {
				_user.login((err, _user) => {
					_user.requestPasswordReset((err, _user) => {
						user = _user;

						done();
					});
				});
			});
		});

		it("returns a 200 status", function(done) {
			let method = "post";
			let path = "/authentication/reset-password";
			let params = {
				resetHash: user.resetHash,
				password: "newpassword"
			};

			api.request(method, path, params, user.email, (err, res) => {
				expect(res.status).to.eq(200);

				done();
			});
		});
	});
});
