import knex from 'knex';
import * as dotenv from 'dotenv';
import logger from '../log/logger';

dotenv.config();

const ENVS = process.env;

const postgres = knex({
  client: 'pg',
  // connection: {
  //   host: ENVS.POSTGRES_URL,
  //   port: 5432,
  //   user: ENVS.POSTGRES_USERNAME,
  //   password: ENVS.POSTGRES_PASSWORD,
  //   database: ENVS.POSTGRES_DB
  // },
  connection: `postgresql://${ENVS.POSTGRES_USERNAME}:${ENVS.POSTGRES_PASSWORD}@${ENVS.POSTGRES_URL}`,
  log: {
    async warn(message) {
      await logger('warning', message, 'postgresql')
    },
    async error(message) {
      await logger('error', message, 'postgresql')
    },
    async deprecate(message) {
      await logger('info', message, 'postgresql')
    },
    async debug(message) {
      await logger('info', message, 'postgresql')
    },
  }
});

export default postgres;
