"use strict";

const BearerStrategy = require("passport-http-bearer");

module.exports = function(mongoose, passport) {
	const User = mongoose.model("User");

	passport.use(new BearerStrategy(async (token, done) => {
		// find user with matching access token
        let user = await User.findOne({ 'tokens._id' : token }, { "tokens.$": 1 });

        if (!user || user.tokens[0].expiresAt < new Date()) {
            return done(null, false);
        }

        // if token is not expired, authenticate user
        user = await User.findOne({ _id: user._id });

        await user.refreshToken(token);

        return done(null, user);
	}));
}
