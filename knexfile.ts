// Update with your config settings.

module.exports = {
  client: "pg",
  connection: process.env.POSTGRES_URL,
  migrations: {
    tableName: "knex_migrations"
  },
  pool: {
    max: 10,
    min: 2
  }
};
