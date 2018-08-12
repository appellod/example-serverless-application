'use strict';

module.exports.id = "add-expireafterseconds-expiresat-index-to-tokens";

module.exports.up = function (done) {
  const collection = this.db.collection("tokens");
  collection.ensureIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }, done);
};

module.exports.down = function (done) {
  const collection = this.db.collection("tokens");
  collection.dropIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }, done);
};
