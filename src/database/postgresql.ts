import knex from 'knex';
import * as dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

const ENVS = process.env;

const postgres = knex({
  client: 'pg',
  connection: {
    host: ENVS.POSTGRES_URL,
    port: 5432,
    user: ENVS.POSTGRES_USERNAME,
    password: ENVS.POSTGRES_PASSWORD,
    database: ENVS.POSTGRES_DB
  },
  // connection: `postgresql://${ENVS.POSTGRES_USERNAME}:${ENVS.POSTGRES_PASSWORD}@${ENVS.POSTGRES_URL}`,
  // searchPath: ['knex', 'public'],${ENVS.MONGO_DB}
  log: {
    warn(message) {
      logger.warn(message)
    },
    error(message) {
      logger.error(message)
    },
    deprecate(message) {
      logger.info(message)
    },
    debug(message) {
      logger.info(message)
    },
  }
});


export default postgres;
