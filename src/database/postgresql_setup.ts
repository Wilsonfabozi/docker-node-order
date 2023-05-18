import postgres from './postgresql';
import logger from '../log/logger';

const setupPostgres = async() => {
  await logger('info', 'Verifying table users', 'postgresql-debug');
  await postgres.schema.hasTable('users').then(async(exists) => {
    if (!exists) {
      logger('info', 'Creating table users', 'postgresql-debug');

      return postgres.schema.createTable('users', (table) => {
        table.integer('document', 11).primary();
        table.string('name', 40);
      });
    }

    await logger('info', 'Table users already exists', 'postgresql-debug');

    return 0;
  });

  await logger('info', 'Verifying table products', 'postgresql-debug');
  await postgres.schema.hasTable('products').then(async(exists) => {
    if (!exists) {
      logger('info', 'Creating table products', 'postgresql-debug');

      return postgres.schema.createTable('products', (table) => {
        table.string('productId', 36).primary();
        table.string('name', 40);
      });
    }

    await logger('info', 'Table products already exists', 'postgresql-debug');

    return 0;
  });

  await logger('info', 'Verifying table orders', 'postgresql-debug');
  await postgres.schema.hasTable('orders').then(async(exists) => {
    if (!exists) {
      await logger('info', 'Creating table orders', 'postgresql-debug');

      return postgres.schema.createTable('orders', (table) => {
        table.increments('orderId');
        table.string('productId').unsigned().notNullable();
        table.string('userDocument').unsigned().notNullable();
        table.integer('amount');
        table.foreign('productId').references('id').inTable('products');
        table.foreign('userDocument').references('document').inTable('users');
      });
    }

    await logger('info', 'Table orders already exists', 'postgresql-debug');

    return 0;
  });

  await logger('info', 'Inserting some values in table products', 'postgresql-debug');
  await postgres('products').insert([{
    productId: 'A624659A-009C-4A18-92BD-2EF1FEC06802',
    name: 'Product A',
  },
  {
    productId: '63BDA413-3693-434F-AFC9-8DD13B2B6107',
    name: 'Product B',
  }])
    .onConflict()
    .ignore();
};

export default setupPostgres;
