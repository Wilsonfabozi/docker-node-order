import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

const ENVS = process.env;

class Database {
  connection = mongoose.connection;

  constructor() {
    try {
      this.connection
        .on('open', () => logger.info('Database: connection open', { label: 'mongodb' }))
        .on('close', () => logger.info('Database: connection closed', { label: 'mongodb' }))
        .on('connected', () => logger.info('Database: connected', { label: 'mongodb' }))
        .on('connecting', () => logger.info('Database: connecting', { label: 'mongodb' }))
        .on('disconnecting', () => logger.info('Database: disconnecting', { label: 'mongodb' }))
        .on('disconnected', () => logger.info('Database: disconnected', { label: 'mongodb' }))
        .on('reconnected', () => logger.info('Database: reconnected}', { label: 'mongodb' }))
        .on('fullsetup', () => logger.info('Database: fullsetup', { label: 'mongodb' }))
        .on('all', () => logger.info('Database: all', { label: 'mongodb' }))
        .on('timeout', (timeout) => logger.error(`Database: timeout: ${timeout}`, { label: 'mongodb' }))
        .on('parseError', (parseError) => logger.error(`Database: parseError: ${parseError}`, { label: 'mongodb' }))
        .on('error', (error) => logger.error(`Database: error: ${error}`, { label: 'mongodb' }));
    } catch (error) {
      logger.error(error);
    }
  }

  async connect() {
    try {
      await mongoose.connect(`mongodb://${ENVS.MONGO_URL}:${ENVS.MONGO_PORT}/${ENVS.MONGO_DB}`);
    } catch (error) {
      logger.error(error);
    }
  }

  async close() {
    try {
      await this.connection.close();
    } catch (error) {
      logger.error(error);
    }
  }
}

export default new Database();