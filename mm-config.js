const conf = {
  collection: "schemaMigrations",
  db: process.env.MONGO_DATABASE,
  directory: "./migrations/mongo",
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT
};

module.exports = conf;
