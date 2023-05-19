import { LogLevel } from '../types';
import errorHandler from '../utils/errorHandler';
import {
  infoLogger,
  warnLogger,
  errorLogger,
  verboseLogger,
  debugLogger,
} from './logger';
import logToMongo from './logToMongo';

const logger = async(level: LogLevel, message: string, label: string, mongo = false) => {
  try {
    switch (level) {
      case 'info':
        infoLogger.log(level, message, { label });
        break;
      case 'warning':
        warnLogger.log(level, message, { label });
        break;
      case 'error':
        errorLogger.log(level, message, { label });
        break;
      case 'verbose':
        verboseLogger.log(level, message, { label });
        break;
      case 'debug':
        debugLogger.log(level, message, { label });
        break;
      default:
        infoLogger.info('logger default case');
    }

    const logText = {
      type: level,
      message,
      label,
      time: new Date(),
    };

    if (!mongo) {
      await logToMongo(logText, label);
    }
  } catch (error) {
    errorHandler(error, label);
  }
};

export default logger;
