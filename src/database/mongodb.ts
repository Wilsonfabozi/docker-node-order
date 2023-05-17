import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import logger from '../log/logger';

dotenv.config();

const ENVS = process.env;

class Database {
  connection = mongoose.connection;

  constructor() {
    try {
      this.connection
        .on('open', () => logger('info', 'Database: connection open', 'mongodb-debug'))
        .on('close', () => logger('info', 'Database: connection closed', 'mongodb-debug'))
        .on('connected', () => logger('info', 'Database: connected', 'mongodb-debug'))
        .on('connecting', () => logger('info', 'Database: connecting', 'mongodb-debug'))
        .on('disconnecting', () => logger('info', 'Database: disconnecting', 'mongodb-debug'))
        .on('disconnected', () => logger('info', 'Database: disconnected', 'mongodb-debug'))
        .on('reconnected', () => logger('info', 'Database: reconnected', 'mongodb-debug'))
        .on('fullsetup', () => logger('info', 'Database: fullsetup', 'mongodb-debug'))
        .on('all', () => logger('info', 'Database: all', 'mongodb-debug'))
        .on('timeout', (timeout) => logger('error', `Database: timeout: ${timeout}`, 'mongodb'))
        .on('parseError', (parseError) => logger('error', `Database: parseError: ${parseError}`, 'mongodb'))
        .on('error', (error) => logger('error', `Database: error: ${error}`, 'mongodb'));
    } catch (error) {
      logger('error', error as string, 'mongodb');
    }
  }

  async connect() {
    try {
      await mongoose.connect(`mongodb://${ENVS.MONGO_URL}:${ENVS.MONGO_PORT}/${ENVS.MONGO_DB}`);
    } catch (error) {
      logger('error', error as string, 'mongodb');
    }
  }

  async close() {
    try {
      await this.connection.close();
    } catch (error) {
      // logger.error(error);
      logger('error', error as string, 'mongodb');
    }
  }
}

export default new Database();