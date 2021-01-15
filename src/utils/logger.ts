import { createLogger, format, transports } from 'winston';

const logFormat = format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  format.printf((info) => `${info.timestamp} [${info.level}] ${info.message}`),
);

export const logger = createLogger({
  transports: [
    // Errors logged to file.
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(
        format.align(),
        logFormat,
      ),
    }),
    // Http warning logs.
    new transports.Http({
      level: 'warn',
      format: format.combine(
        format.json(),
        logFormat,
      ),
    }),
    // Colorized logs to console.
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.align(),
        logFormat,
      ),
    }),
  ],
});
