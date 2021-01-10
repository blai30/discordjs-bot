const winston = require('winston');

const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.printf(({
    level,
    message,
    timestamp,
  }) => `${timestamp} [${level}] ${message}`),
);

const logger = winston.createLogger({
  transports: [
    // Errors logged to file.
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.align(),
        logFormat,
      ),
    }),
    // Http warning logs.
    new winston.transports.Http({
      level: 'warn',
      format: winston.format.combine(
        winston.format.json(),
        logFormat,
      ),
    }),
    // Colorized logs to console.
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.align(),
        logFormat,
      ),
    }),
  ],
});

module.exports = logger;
