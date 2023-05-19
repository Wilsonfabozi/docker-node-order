import { Knex } from 'knex';

const postgresSetupMock = async(postgres: any) => {
  await postgres.schema
    .createTable('customers', (table: Knex.CreateTableBuilder) => {
      table.string('document', 11).primary();
      table.string('name', 40);
    })
    .createTable('products', (table: Knex.CreateTableBuilder) => {
      table.string('productId', 36).primary();
      table.string('name', 40);
    }).createTable('orders', (table: Knex.CreateTableBuilder) => {
      table.increments('orderId');
      table.string('customerDocument').unsigned().notNullable();

      table.foreign('customerDocument').references('document').inTable('customers');
    }).createTable('orderItem', (table: Knex.CreateTableBuilder) => {
      table.increments('orderItemId');
      table.integer('orderId').unsigned().notNullable();
      table.string('productId').unsigned().notNullable();
      table.integer('amount');

      table.foreign('orderId').references('orderId').inTable('orders');
      table.foreign('productId').references('productId').inTable('products');
    })
    .createTable('deliveries', (table: Knex.CreateTableBuilder) => {
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

  await postgres('products').insert([
    {
      productId: 'A624659A-009C-4A18-92BD-2EF1FEC06802',
      name: 'Product A',
    },
    {
      productId: '63BDA413-3693-434F-AFC9-8DD13B2B6107',
      name: 'Product B',
    },
  ]);
};

export default postgresSetupMock;
