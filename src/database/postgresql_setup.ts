
// import { Knex } from 'knex';
import postgres from "./postgresql";

postgres.schema.hasTable('users').then((exists) => {
  if (!exists) {
    return postgres.schema.createTable('users', (table) => {
      table.integer('document', 11).primary();
      table.string('name', 100);
    });
  }
});
