import Mongodb from '../database/mongodb';
import { LogText } from '../types';
import Log from './log.model';

const logToMongo = async(log: LogText, label: string) => {
  const conn = new Mongodb(label);

  await conn.connect();

  const newLog = new Log(log);

  await newLog.save();

  await conn.close();
};

export default logToMongo;
