import * as Knex from "knex";

exports.up = function(knex: Knex) {
  return knex.raw(`
    CREATE TRIGGER update_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
  `);
};

exports.down = function(knex: Knex) {
  return knex.raw(`DROP TRIGGER update_updated_at`);
};
