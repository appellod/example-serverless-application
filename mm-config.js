const path = require("path");

const { Config } = require(__dirname + "/dist/config");

const env = process.env.NODE_ENV || "local";
const config = new Config(env);

const conf = {
  host: config.mongo.host,
  port: config.mongo.port,
  db: config.mongo.database,
  collection: "schemaMigrations",
  directory: "mongodb-migrations"
};

module.exports = conf;