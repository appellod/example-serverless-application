"use strict";

const chai = require('chai');
const nock = require("nock");

// set up test suite and import models
const bs = require("../bootstrap");
const User = bs.mongoose.model("User");

const expect = chai.expect;

describe("models/user.js", function() {
	describe("schema.statics.resetPassword()", function() {
		let user;

		beforeEach(async function() {
            user = await User.mock({});
            user = await user.requestPasswordReset();
		});

		it("updates the user's password", async function() {
			const _user = await User.resetPassword(user.resetHash, "password");
			expect(_user.password).to.not.eq(user.password);
		});

		it("removes the user's resetHash", async function() {
            const _user = await User.resetPassword(user.resetHash, "password");
            expect(_user.resetHash).to.be.undefined;
		});
	});

	describe("schema.methods.login()", function() {
		let token, user;

		beforeEach(async function() {
			user = await User.mock({});
		});

		it("adds an access token to the user's tokens array", async function() {
            ({ token, user} = await user.login());

            expect(user.tokens.length).to.eq(1);
            expect(user.tokens[0]._id.toString()).to.eq(token.toString());
		});
	});

	describe("schema.methods.logout()", function() {
		let token, user;

		beforeEach(async function() {
            user = await User.mock({});
            ({ token, user } = await user.login());
		});

		it("removes the token that was used for the API request", async function() {
            user = await user.logout(token);
            expect(user.tokens.length).to.eq(0);
		});
	});

	describe("schema.methods.refreshToken()", function() {
		let user, token;

		beforeEach(async function() {
            user = await User.mock({});
            ({ token, user } = await user.login());
		});

		it("updates the token's expiresAt", async function() {
			let expiresAt = user.tokens[0].expiresAt;

            user = await user.refreshToken(token);
            expect(user.tokens[0].expiresAt).to.be.above(expiresAt);
		});
	});

	describe("schema.methods.requestPasswordReset()", async function() {
		let user;

		beforeEach(async function() {
            user = await User.mock({});

            const scope = nock(/mailgun\.net/)
                .post(/.*/)
                .reply(200, {
                    id: "<20170422765241.92160.12345.951E2345@sandboxf70783234584b198234561d8029e646.mailgun.org>",
                    message: "Queued. Thank you."
                });
		});

		it("sets the user's resetHash to a random hash", async function() {
            user = await user.requestPasswordReset();
            expect(user.resetHash).to.be.defined;
		});
	});
});
