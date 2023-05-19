import knex from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const ENVS = process.env;

// eslint-disable-next-line max-len
const connectionUrl = `postgresql://${ENVS.POSTGRES_USERNAME}:${ENVS.POSTGRES_PASSWORD}@${ENVS.POSTGRES_URL}/${ENVS.POSTGRES_DB}`;

const returnConnection = () => {
  const postgres = knex({
    client: 'pg',
    connection: connectionUrl,
  });

  return postgres;
};

export default returnConnection();
