/* eslint-disable max-len */
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import logger from '../logger';
import errorHandler from '../utils/errorHandler';

dotenv.config();

const ENVS = process.env;

const connectionUrl = `mongodb://${ENVS.MONGO_USERNAME}:${ENVS.MONGO_PASSWORD}@${ENVS.MONGO_URL}:${ENVS.MONGO_PORT}/${ENVS.MONGO_DB}`;
// const connectionUrl = `mongodb://${ENVS.MONGO_URL}:${ENVS.MONGO_PORT}/${ENVS.MONGO_DB}`);

class Mongodb {
  // connection = mongoose.connection;
  connection = mongoose.createConnection(connectionUrl);

  label = '';

  constructor(label: string) {
    try {
      this.label = label;
      this.connection
        // .once('open', () => logger('debug', 'Database: connection open', label, true))
        // .once('close', () => logger('debug', 'Database: connection closed', label, true))
        // .once('connected', () => logger('debug', 'Database: connected', label, true))
        // .on('connecting', () => logger('debug', 'Database: connecting', label, true))
        // .on('disconnecting', () => logger('debug', 'Database: disconnecting', label, true))
        // .once('disconnected', () => logger('debug', 'Database: disconnected', label, true))
        // .on('reconnected', () => logger('debug', 'Database: reconnected', label, true))
        // .on('fullsetup', () => logger('debug', 'Database: fullsetup', label, true))
        // .on('all', () => logger('debug', 'Database: all', label, true))
        // .on('timeout', (timeout) => logger('error', `Database: timeout: ${timeout}`, this.label))
        // eslint-disable-next-line max-len
        // .on('parseError', (parseError) => logger('error', `Database: parseError: ${parseError}`, this.label))
        .on('error', (error) => errorHandler(error, this.label, true));
    } catch (error) {
      logger('error', error as string, this.label);
    }
  }

  async connect() {
    try {
      await mongoose.connect(connectionUrl);
    } catch (error) {
      errorHandler(error, this.label, true);
    }
  }

  async close() {
    try {
      await this.connection.close();
    } catch (error) {
      errorHandler(error, this.label, true);
    }
  }
}

export default Mongodb;
