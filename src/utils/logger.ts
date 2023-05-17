import winston, { format } from 'winston';

const logFormat = format.combine(
  format.timestamp(),
  winston.format.printf(({ level, message, label, timestamp }) => {
    const hora = `[${new Date(timestamp).toLocaleString('pt-BR')}]`;

    return `${hora} [${label}] ${level}: ${message}`;
  })
)

const logLevels = {
  none: 0,                    // no error logging - don't log with this, set it in process.env.LOG_LEVEL to turn off logging
                              // Could also be achieved by silent=true in winston.createLogger, from process.env, but this is simplest
  emergency : 1,              // system is unusable
  alert: 2,                   // action must be taken immediately
  critical: 3,                // critical conditions
  unhandledException: 4,      // unhandled exception
  error: 5,                   // error conditions
  coding_bug: 6,              // hard bug. E.g switch stemante hits default, etc
  warning: 7,                 // warning conditions
  notice: 8,                  // normal but significant condition
  info: 9,                    // informational messages
  debug: 10,                  // debug-level messages
  HTTP_SEND: 11,              // HTTP request sent
  HTTP_RECV: 12,              // HTTP request sent
  called: 13,                 // function called
  returns: 14,                // function returns
  log_everything: 15,         // always the lowest level, so that we can log everything
};

const logger = winston.createLogger({
  levels: logLevels,
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
