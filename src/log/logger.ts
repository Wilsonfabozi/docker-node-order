import winston, { format } from 'winston';
import mongodb from '../database/mongodb';
import Log from './log.model'

const logFormat = format.combine(
  format.timestamp(),
  winston.format.printf(({ level, message, label, timestamp }) => {
    const hora = `[${new Date(timestamp).toLocaleString('pt-BR')}]`;

    return `${hora} [${label}] ${level}: ${message}`;
  })
)

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

const logToFile = winston.createLogger({
  levels: logLevels,
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/logs.log' }),
  ],
});

const logToMongo = async (level: string, message: string, label: string) => {
  await mongodb.connect();

  const newLog = new Log({
    type: level,
    message,
    label,
    time: new Date(),
  });

  await newLog.save();

  await mongodb.close();
}

const logger = async (level: string, message: string, label: string) => {
  switch(level){
    case 'info':
    case 'warning':
    case 'error':
      logToFile.log({level, message, label})
      break;
  }

  if(label !== 'mongodb-debug'){
    await logToMongo(level, message, label)
  }
}


export default logger;
