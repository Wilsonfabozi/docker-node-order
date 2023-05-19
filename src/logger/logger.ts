import { LogLevel } from '../types';
import {
  infoLogger,
  warnLogger,
  errorLogger,
  verboseLogger,
  debugLogger,
} from './logCreator';
import logToMongo from './logToMongo';

export const logger = {
  log: async(level: LogLevel, message: string, label: string, mongo = false) => {
    switch (level) {
      case 'info':
        infoLogger.log(level, message, { label });
        break;
      case 'warn':
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
  },
};

export default logger.log;
