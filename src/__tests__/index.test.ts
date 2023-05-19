import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { LogText } from '../types';
import app, { initServices } from '../index';
import { logToMongo } from '../logger/logToMongo';
import { setupPostgres } from '../database/postgresqlSetup';
import { postgres, mem } from './__mocks__/postgres.mock';
import postgreSetupMock from './__mocks__/postgresSetup.mock';
import logToMongoMock from './__mocks__/logToMongo.mock';

const payload = {
  customer: {
    name: 'Fulano',
    document: '25892913023',
  },
  items: [
    {
      id: 'A624659A-009C-4A18-92BD-2EF1FEC06802',
      amount: 2,
    },
    {
      id: '63BDA413-3693-434F-AFC9-8DD13B2B6107',
      amount: 1,
    },
  ],
  address: {
    zip_code: '06663289',
    house_number: '743',
    street: 'Av. Sagitário',
    neighborhood: 'Alphaville Conde II',
    city: 'Barueri',
    uf: 'SP',
    complement: '',
    reference: 'perto do posto de gasolina',
  },
};

const products = [{
  productId: 'A624659A-009C-4A18-92BD-2EF1FEC06802',
  name: 'Product A',
},
{
  productId: '63BDA413-3693-434F-AFC9-8DD13B2B6107',
  name: 'Product B',
}];

describe('order controller', () => {
  let mongod: MongoMemoryServer;
  let mongodUri: string;

  beforeAll(async() => {
    mongod = await MongoMemoryServer.create();
    mongodUri = mongod.getUri();
  });

  jest.spyOn(logToMongo, 'log')
    .mockImplementation((log: LogText) => logToMongoMock(log, mongodUri));

  jest.spyOn(initServices, 'setupPostgres')
    .mockImplementation(() => postgreSetupMock(postgres));

  // Try to run a join
  // const selectedRows = await knex('users')
  //   .join('accounts', 'users.id', 'accounts.user_id')
  //   .select('users.user_name as user', 'accounts.account_name as account');

  // expect(selectedRows)
  //   .to.deep.equal([
  //     { user: 'Tim', account: 'knex' },
  //   ]);

  it('postgres setup should create tables and insert values', async() => {
    const result = jest.spyOn(setupPostgres, 'setup');
    await setupPostgres.setup('0');

    expect(result).toHaveBeenCalled();
    expect(mem.public.many('select * from products')).toEqual(products);
  });

  it('POST /order/create', () => {
    request(app)
      .post('/order/create')
      .send(payload)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Order placed successfully');
      });
  });
});
