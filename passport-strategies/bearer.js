"use strict";

const BearerStrategy = require("passport-http-bearer");

module.exports = (mongoose, passport) => {
  const User = mongoose.model("User");

  passport.use(new BearerStrategy((token, done) => {
      // find user with matching access token
      User.findOne({ 'tokens._id' : token }, { "tokens.$": 1 }, (err, user) => {
        if (user) {
          // if token is not expired, authenticate user
          if (user.tokens[0].expiresAt >= new Date()) {
            User.findOne({ _id: user._id }, (err, user) => {
              if (err) return done(err, false);

              user.refreshToken(token, (err) => {});

              return done(null, user);
            });
          } else {
            return done(null, false);
          }
        } else {
          return done(null, false);
        }
      });
    }
  ));
}
