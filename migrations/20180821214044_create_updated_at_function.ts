import * as Knex from "knex";

exports.up = function(knex: Knex) {
  return knex.raw(`
    CREATE FUNCTION update_updated_at_column() RETURNS trigger
      LANGUAGE plpgsql
      AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$;
  `);
};

exports.down = function(knex: Knex) {
  return knex.raw(`DROP FUNCTION update_updated_at_column()`);
};
