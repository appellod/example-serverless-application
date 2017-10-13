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
			it("returns isAvailable set to true", async function() {
				const method = "get";
				const path = "/authentication/availability";
				const params = {
					email: "available@example.com"
				};

                const res = await api.request(method, path, params, null);
                expect(res.body.isAvailable).to.be.true;
			});
		});

		context("when email is unavailable", function() {
			beforeEach(async function() {
                await User.mock({ email: "taken@example.com" });
			});

			it("returns isAvailable set to false", async function() {
				const method = "get";
				const path = "/authentication/availability";
				const params = {
					email: "taken@example.com"
				};

				const res = await api.request(method, path, params, null);
				expect(res.body.isAvailable).to.be.false;
			});
		});
	});

	describe("POST /authentication/signup", function() {
		it("returns the user and access token", async function() {
			const method = "post";
			const path = "/authentication/signup";
			const params = {
				email: "user@example.com",
				password: "password"
			};

			const res = await api.request(method, path, params, null);
            expect(res.body.user).to.be.defined;
			expect(res.body.token).to.be.defined;
		});
	});

	describe("POST /authentication/login", function() {
		let user;

		beforeEach(async function() {
            user = await User.mock({ password: "password" });
		});

		context("when credentials are correct", function() {
			it("returns the user and access token", async function() {
				const method = "post";
				const path = "/authentication/login";
				const params = {
					email: user.email,
					password: "password"
				};

				const res = await api.request(method, path, params, null);
                expect(res.body.user).to.be.defined;
				expect(res.body.token).to.be.defined;
			});
		});

		context("when credentials are incorrect", function() {
			it("returns an error message", async function() {
				const method = "post";
				const path = "/authentication/login";
				const params = {
					email: user.email,
					password: "wrong"
				};

				const res = await api.request(method, path, params, null);
                expect(res.status).to.eq(400);
				expect(res.body.error).to.be.defined;
			});
		});
	});

	describe("DELETE /authentication/logout", function() {
		let token, user;

		beforeEach(async function() {
            user = await User.mock({});
            ({ token, user} = await user.login());
		});

		it("returns a 200 status", async function() {
			const method = "delete";
			const path = "/authentication/logout";
			const params = null;

			const res = await api.request(method, path, params, user.email);
            expect(res.status).to.eq(200);
		});
	});

	describe("POST /authentication/request-password-reset", function() {
		let token, user;

		beforeEach(async function() {
            user = await User.mock({});
            ({ token, user} = await user.login());
		});

		it("returns a 200 status", async function() {
			const method = "post";
			const path = "/authentication/request-password-reset";
			const params = {
				email: user.email
			};

			const res = await api.request(method, path, params, null);
			expect(res.status).to.eq(200);
		});
	});

	describe("POST /authentication/reset-password", function() {
		let token, user;

		beforeEach(async function() {
            user = await User.mock({});
            ({ token, user} = await user.login());
            user = await user.requestPasswordReset();
		});

		it("returns a 200 status", async function() {
			const method = "post";
			const path = "/authentication/reset-password";
			const params = {
				resetHash: user.resetHash,
				password: "newpassword"
			};

			const res = await api.request(method, path, params, user.email);
            expect(res.status).to.eq(200);
		});
	});
});
