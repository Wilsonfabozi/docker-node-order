import knex from 'knex';
import * as dotenv from 'dotenv';
import logger from '../logger';

dotenv.config();

const ENVS = process.env;

// eslint-disable-next-line max-len
const connectionUrl = `postgresql://${ENVS.POSTGRES_USERNAME}:${ENVS.POSTGRES_PASSWORD}@${ENVS.POSTGRES_URL}/${ENVS.POSTGRES_DB}`;

const returnConnection = (label: string) => {
  const postgres = knex({
    client: 'pg',
    connection: connectionUrl,
    log: {
      async warn(message) {
        await logger('warning', message, label);
      },
      async error(message) {
        await logger('error', message, label);
      },
      async deprecate(message) {
        await logger('info', message, label);
      },
      async debug(message) {
        await logger('info', message, label);
      },
    },
  });

  return postgres;
};

export default returnConnection;
