import postgres from './postgresql';
import logger from '../logger';

const setupPostgres = async(label: string) => {
  await logger('debug', 'Creating PostgreSQL database tables', label);
  await postgres(label).schema.hasTable('customers').then(async(exists) => {
    if (!exists) {
      // await logger('debug', 'Creating table customers', label);

      return postgres(label).schema.createTable('customers', (table) => {
        table.string('document', 11).primary();
        table.string('name', 40);
      });
    }

    return 0;
  });

  await postgres(label).schema.hasTable('products').then(async(exists) => {
    if (!exists) {
      // await logger('debug', 'Creating table products', label);

      return postgres(label).schema.createTable('products', (table) => {
        table.string('productId', 36).primary();
        table.string('name', 40);
      });
    }

    return 0;
  });

  await postgres(label).schema.hasTable('orders').then(async(exists) => {
    if (!exists) {
      // await logger('debug', 'Creating table orders', label);

      return postgres(label).schema.createTable('orders', (table) => {
        table.increments('orderId');
        table.string('customerDocument').unsigned().notNullable();

        table.foreign('customerDocument').references('document').inTable('customers');
      });
    }

    return 0;
  });

  await postgres(label).schema.hasTable('orderItem').then(async(exists) => {
    if (!exists) {
      // await logger('debug', 'Creating table orderItem', label);

      return postgres(label).schema.createTable('orderItem', (table) => {
        table.increments('orderItemId');
        table.integer('orderId').unsigned().notNullable();
        table.string('productId').unsigned().notNullable();
        table.integer('amount');

        table.foreign('orderId').references('orderId').inTable('orders');
        table.foreign('productId').references('productId').inTable('products');
      });
    }

    return 0;
  });

  await postgres(label).schema.hasTable('deliveries').then(async(exists) => {
    if (!exists) {
      // await logger('debug', 'Creating table deliveries', label);

      return postgres(label).schema.createTable('deliveries', (table) => {
        table.increments('deliveryId');
        table.integer('orderId').unsigned().notNullable();
        table.string('customerDocument').unsigned().notNullable();
        table.string('status').notNullable();
        table.string('zip_code').notNullable();
        table.string('house_number').notNullable();
        table.string('street').notNullable();
        table.string('neighborhood').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('complement');
        table.string('reference');

        table.foreign('orderId').references('orderId').inTable('orders');
        table.foreign('customerDocument').references('document').inTable('customers');
      });
    }

    return 0;
  });

  // await logger('debug', 'Populating products table', label);
  await postgres(label)('products').insert([{
    productId: 'A624659A-009C-4A18-92BD-2EF1FEC06802',
    name: 'Product A',
  },
  {
    productId: '63BDA413-3693-434F-AFC9-8DD13B2B6107',
    name: 'Product B',
  }]).onConflict().ignore();
};

export default setupPostgres;
