// import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { LogText } from '../types';
import { logger } from '../logger/logger';
import { logToMongo } from '../logger/logToMongo';
import logToMongoMock from './__mocks__/logToMongo.mock';
import Log from '../logger/log.model';

describe('logger', () => {
  let mongod: MongoMemoryServer;
  let mongodUri: string;

  beforeAll(async() => {
    mongod = await MongoMemoryServer.create();
    mongodUri = mongod.getUri();
  });

  jest.spyOn(logToMongo, 'log')
    .mockImplementation((log: LogText) => logToMongoMock(log, mongodUri));

  it('should log to console with info level', async() => {
    const result = jest.spyOn(logger, 'log');
    await logger.log('info', 'test', '0');

    expect(result).toHaveBeenCalled();
  });

  it('should log to console with warning level', async() => {
    const result = jest.spyOn(logger, 'log');
    await logger.log('warn', 'test', '0');

    expect(result).toHaveBeenCalled();
  });

  it('should log to console with error level', async() => {
    const result = jest.spyOn(logger, 'log');
    await logger.log('error', 'test', '0');

    expect(result).toHaveBeenCalled();
  });
  it('should log to console with verbose level', async() => {
    const result = jest.spyOn(logger, 'log');
    await logger.log('verbose', 'test', '0');

    expect(result).toHaveBeenCalled();
  });

  it('should log to console with debug level', async() => {
    const result = jest.spyOn(logger, 'log');
    await logger.log('debug', 'test', '0');

    expect(result).toHaveBeenCalled();
  });

  it('should log to console with unhandled level', async() => {
    const result = jest.spyOn(logger, 'log');
    await logger.log('unhandled', 'test', '0');

    expect(result).toHaveBeenCalled();
  });

  it('should get all test logs from database', async() => {
    const logs = await Log.find({});

    expect(logs.length).toBe(6);
  });

  // it('should throw error', async() => {
  //   jest.spyOn(logToMongo, 'logToMongo').mockImplementation(() => { throw new Error('test'); });
  //   const result = jest.spyOn(logger, 'log');
  //   await logger.log('unhandled', 'test', '0');

  //   expect(result).toHaveBeenCalled();
  // });
});
