
import postgres from "./postgresql";
import logger from "../log/logger";

const setupPostgres = async () => {
  await logger('info', 'Verifying table users', 'postgresql-debug')
  await postgres.schema.hasTable('users').then(async (exists) => {
    if (!exists) {
      logger('info', 'Creating table users', 'postgresql-debug')
      return postgres.schema.createTable('users', (table) => {
        table.integer('document', 11).primary();
        table.string('name', 40);
      });
    }
  
    await logger('info', 'Table users already exists', 'postgresql-debug')
    return;
  });
  
  await logger('info', 'Verifying table products', 'postgresql-debug')
  await postgres.schema.hasTable('products').then(async (exists) => {
    if (!exists) {
      logger('info', 'Creating table products', 'postgresql-debug')
      return postgres.schema.createTable('products', (table) => {
        table.string('productId', 36).primary();
        table.string('name', 40);
      });
    }
  
    await logger('info', 'Table products already exists', 'postgresql-debug')
    return;
  });
  
  await logger('info', 'Verifying table orders', 'postgresql-debug')
  await postgres.schema.hasTable('orders').then(async (exists) => {
    if (!exists) {
      await logger('info', 'Creating table orders', 'postgresql-debug')
      return postgres.schema.createTable('orders', (table) => {
        table.increments('orderId');
        table.string('productId').unsigned().notNullable();
        table.string('userDocument').unsigned().notNullable();
        table.integer('amount');
  
        table.foreign('productId').references('id').inTable('products');
        table.foreign('userDocument').references('document').inTable('users');
      });
    }
  
    await logger('info', 'Table orders already exists', 'postgresql-debug')
    return;
  });
}

export default setupPostgres;
