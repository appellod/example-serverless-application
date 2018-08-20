'use strict';

module.exports.id = "add-unique-email-index-to-users";

module.exports.up = async function (done) {
  const collection = this.db.collection("users");
  collection.ensureIndex({ email: 1 }, { unique: true }, done);
};

module.exports.down = function (done) {
  const collection = this.db.collection("users");
  collection.dropIndex({ email: 1 }, { unique: true }, done);
};