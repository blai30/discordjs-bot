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
    // new winston.transports.File({
    //   filename: 'error.log',
    //   level: 'error',
    //   format: winston.format.combine(
    //     winston.format.align(),
    //     logFormat,
    //   ),
    // }),
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
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.align(),
        logFormat,
      ),
    }),
  ],
});

// class Logger {
//   static log(level = 'info', content) {
//     let logLevel;
//     switch (level) {
//       case 'info': {
//         logLevel = chalk.bgBlue(level.toUpperCase());
//         break;
//       }
//       case 'warn': {
//         logLevel = chalk.bgYellow(level.toUpperCase());
//         break;
//       }
//       case 'error': {
//         logLevel = chalk.bgRed(level.toUpperCase());
//         break;
//       }
//       case 'debug': {
//         logLevel = chalk.green(level.toUpperCase());
//         break;
//       }
//       default: {
//         throw new TypeError('Logger level must be error, warn, info, or debug.');
//       }
//     }
//     return logger.log(logLevel, content);
//   }
//
//   static info(content) {
//     return this.log('info', content);
//   }
//
//   static warn(content) {
//     return this.log('warn', content);
//   }
//
//   static error(content) {
//     return this.log('error', content);
//   }
//
//   static debug(content) {
//     return this.log('debug', content);
//   }
// }

module.exports = logger;
