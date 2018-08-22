import * as Knex from "knex";

exports.up = function(knex: Knex) {
  return knex.schema.createTable("users", function(table) {
    table.timestamp("created_at").defaultTo(knex.raw("now()"));
    table.string("email").notNullable().index();
    table.increments("id").unsigned().primary();
    table.integer("level").defaultTo(0);
    table.text("password").notNullable();
    table.string("reset_hash").nullable();
    table.timestamp("updated_at").defaultTo(knex.raw("now()"));
  });
};

exports.down = function(knex: Knex) {
  return knex.schema.dropTable("users");
};
