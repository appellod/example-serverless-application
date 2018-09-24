import * as Knex from "knex";

exports.up = function(knex: Knex) {
  return knex.schema
    .createTable("friends", function(table) {
      table.timestamp("created_at").defaultTo(knex.raw("now()"));
      table.integer("from_user_id").notNullable().index().references("users.id").onDelete("CASCADE");
      table.integer("to_user_id").notNullable().index().references("users.id").onDelete("CASCADE");
      table.timestamp("updated_at").defaultTo(knex.raw("now()"));

      table.primary(["from_user_id", "to_user_id"]);
    })
    .raw(`
      CREATE TRIGGER update_updated_at
      BEFORE UPDATE ON friends
      FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
    `);
};

exports.down = function(knex: Knex) {
  return knex.schema.dropTable("friends");
};
