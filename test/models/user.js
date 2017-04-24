"use strict";

const chai = require('chai');
const nock = require("nock");

// set up test suite and import models
const bs = require("../bootstrap");
const User = bs.mongoose.model("User");

const expect = chai.expect;

describe("models/user.js", () => {
	describe("schema.statics.resetPassword()", () => {
		let user;

		beforeEach((done) => {
			User.mock({}, (err, _user) => {
				_user.requestPasswordReset((err, _user) => {
					user = _user;

					done();
				});
			});
		});

		it("updates the user's password", (done) => {
			User.resetPassword(user.resetHash, "password", (err, _user) => {
				expect(_user.password).to.not.eq(user.password);

				done();
			});
		});

		it("removes the user's resetHash", (done) => {
			User.resetPassword(user.resetHash, "password", (err, _user) => {
				expect(_user.resetHash).to.be.undefined;

				done();
			});
		});
	});

	describe("schema.methods.login()", () => {
		let user;

		beforeEach((done) => {
			User.mock({}, (err, _user) => {
				user = _user;

				done();
			});
		});

		it("adds an access token to the user's tokens array", (done) => {
			user.login((err, user, token) => {
				expect(user.tokens.length).to.eq(1);
				expect(user.tokens[0]._id.toString()).to.eq(token.toString());

				done();
			});
		});
	});

	describe("schema.methods.logout()", () => {
		let user, token;

		beforeEach((done) => {
			User.mock({}, (err, testUser) => {
				testUser.login((err, _user, _token) => {
					user = _user;
					token = _token;

					done();
				});
			});
		});

		it("removes the token that was used for the API request", (done) => {
			user.logout(token, (err, user) => {
				expect(user.tokens.length).to.eq(0);

				done();
			});
		});
	});

	describe("schema.methods.refreshToken()", () => {
		let user, token;

		beforeEach((done) => {
			User.mock({}, (err, testUser) => {
				testUser.login((err, _user, _token) => {
					user = _user;
					token = _token;

					done();
				});
			});
		});

		it("updates the token's expiresAt", (done) => {
			let expiresAt = user.tokens[0].expiresAt;

			user.refreshToken(token, (err, user) => {
				expect(user.tokens[0].expiresAt).to.be.above(expiresAt);

				done();
			});
		});
	});

	describe.only("schema.methods.requestPasswordReset()", () => {
		let user;

		beforeEach((done) => {
			User.mock({}, (err, _user) => {
				user = _user;

				var scope = nock(/mailgun\.net/)
					.post(/.*/)
					.reply(200, {
						id: "<20170422765241.92160.12345.951E2345@sandboxf70783234584b198234561d8029e646.mailgun.org>",
						message: "Queued. Thank you."
					});

				done();
			});
		});

		it("sets the user's resetHash to a random hash", (done) => {
			user.requestPasswordReset((err, user) => {
				expect(err).to.be.null;
				expect(user.resetHash).to.be.defined;

				done();
			});
		});
	});
});
