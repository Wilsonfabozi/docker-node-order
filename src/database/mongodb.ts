/* eslint-disable max-len */
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import errorHandler from '../utils/errorHandler';

dotenv.config();

const ENVS = process.env;

export const connectionUrl = `mongodb://${ENVS.MONGO_USERNAME}:${ENVS.MONGO_PASSWORD}@${ENVS.MONGO_URL}:${ENVS.MONGO_PORT}/${ENVS.MONGO_DB}`;
// const connectionUrl = `mongodb://${ENVS.MONGO_URL}:${ENVS.MONGO_PORT}/${ENVS.MONGO_DB}`;

class Mongodb {
  connection = mongoose.createConnection(connectionUrl);

  label = '';

  constructor(label: string) {
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
    // .on('parseError', (parseError) => logger('error', `Database: parseError: ${parseError}`, this.label))
      .on('error', (error) => errorHandler(error, this.label, true));
  }

  async connect() {
    await mongoose.connect(connectionUrl);
  }

  async close() {
    await this.connection.close();
  }
}

export default Mongodb;
