import * as chai from "chai";
import { Chance } from "chance";

import { Mongoose } from "../../lib/mongoose";
import { IUserDocument, IAuthToken } from "../../models/user";
import { ApiHelper } from "../helpers/api-helper";

const index = require("../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();
const expect = chai.expect;

describe("controllers/authentication.js", function() {
	describe("GET /authentication/availability", function() {
		context("when email is available", function() {
			it("returns isAvailable set to true", async function() {
				const method = "get";
				const path = "/authentication/availability";
				const params = {
					email: "available@example.com"
				};

        const res = await apiHelper.request(method, path, params, null);
        expect(res.body.isAvailable).to.be.true;
			});
		});

		context("when email is unavailable", function() {
			beforeEach(async function() {
        await Mongoose.User.mock({ email: "taken@example.com" });
			});

			it("returns isAvailable set to false", async function() {
				const method = "get";
				const path = "/authentication/availability";
				const params = {
					email: "taken@example.com"
				};

				const res = await apiHelper.request(method, path, params, null);
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

			const res = await apiHelper.request(method, path, params, null);
      
      expect(res.body.user).to.exist;
			expect(res.body.token).to.exist;
		});
	});

	describe("POST /authentication/login", function() {
		let user: IUserDocument;

		beforeEach(async function() {
      user = await Mongoose.User.mock({ password: "password" });
		});

		context("when credentials are correct", function() {
			it("returns the user and access token", async function() {
				const method = "post";
				const path = "/authentication/login";
				const params = {
					email: user.email,
					password: "password"
				};

				const res = await apiHelper.request(method, path, params, null);
        
        expect(res.body.user).to.exist;
				expect(res.body.token).to.exist;
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

				const res = await apiHelper.request(method, path, params, null);
        
        expect(res.status).to.eq(400);
				expect(res.body.error).to.exist;
			});
		});
	});

	describe("DELETE /authentication/logout", function() {
		let token: IAuthToken, user: IUserDocument;

		beforeEach(async function() {
      user = await Mongoose.User.mock({});
      ({ token, user} = await user.login());
		});

		it("returns a 200 status", async function() {
			const method = "delete";
			const path = "/authentication/logout";
			const params: any = null;

			const res = await apiHelper.request(method, path, params, user.email);
      
      expect(res.status).to.eq(200);
		});
	});

	describe("POST /authentication/request-password-reset", function() {
		let token: IAuthToken, user: IUserDocument;

		beforeEach(async function() {
      user = await Mongoose.User.mock({});
      ({ token, user} = await user.login());
		});

		it("returns a 200 status", async function() {
			const method = "post";
			const path = "/authentication/request-password-reset";
			const params = {
				email: user.email
			};

      const res = await apiHelper.request(method, path, params, null);
      
			expect(res.status).to.eq(200);
		});
	});

	describe("POST /authentication/reset-password", function() {
		let token: IAuthToken, user: IUserDocument;

		beforeEach(async function() {
      user = await Mongoose.User.mock({});
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

			const res = await apiHelper.request(method, path, params, user.email);
      
      expect(res.status).to.eq(200);
		});
	});
});
