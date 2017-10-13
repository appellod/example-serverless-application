"use strict";

const async = require("async");

process.env.NODE_ENV = "test";

// start the API server
const index = require("../index");
const config = index.config;
const mongoose = index.mongoose;

const User = mongoose.model("User");

// remove all records from DB
beforeEach(function(done) {
	let models = mongoose.modelNames();

    const promises = [];
    models.forEach(model => {
        const Model = mongoose.model(model);
        promises.push(Model.remove({}));
    });

    Promise.all(promises).then(async results => {
        const user = await User.mock({ email: "test@example.com" });
        await user.login();

        return done();
    });
});

module.exports = { config, mongoose };
