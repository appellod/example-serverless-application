"use strict";

const async = require("async");

process.env.NODE_ENV = "test";

// start the API server
const index = require("../index");
const config = index.config;
const mongoose = index.mongoose;

const User = mongoose.model("User");

beforeEach((done) => {
	// remove all records from DB
	let models = mongoose.modelNames();
	async.each(models, (model, next) => {
		let Model = mongoose.model(model);
		Model.remove({}, (err, raw) => {
			if (err) console.error(err);

			return next();
		});
	}, (err) => {
		if (err) console.error(err);

		// create test user for API access
		User.mock({ email: "test@example.com" }, (err, user) => {
			user.login((err, user, token) => {
				return done();
			});
		});
	});
});

module.exports = {
	config: config,
	mongoose: mongoose
}
