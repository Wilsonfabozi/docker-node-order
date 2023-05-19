import { LogText } from '../../types';
import MongoMock from './mongo.mock';
import Log from '../../logger/log.model';

let label = -1;

const incrementLabel = () => {
  label = label + 1;

  return label.toString();
};

const returnLogText = (log: LogText) => ({
  type: log.type,
  message: log.message,
  label: incrementLabel(),
  time: new Date(),
});

const logToMongoMock = async(log: LogText, mongodUri: string) => {
  const conn = new MongoMock(mongodUri);

  await conn.connect();

  const newLog = new Log(returnLogText(log));

  await newLog.save();

  await conn.close();

  Promise.resolve();
};

export default logToMongoMock;
