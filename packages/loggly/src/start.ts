import * as winston from "winston";
import "winston-loggly-bulk";

export interface StartOptions {
  inputToken: string;
  level?: string;
  subdomain: string;
  tags: string[];
}

export function start(options: StartOptions) {
  const logger = new winston.Logger({
    transports: [
      new (winston.transports.Console)({
        colorize: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: false,
        level: options.level || "info"
      })
    ]
  });

  const logglyConfig = {
    handleExceptions: true,
    humanReadableUnhandledException: true,
    inputToken: options.inputToken,
    isBulk: false,
    json: true,
    level: "info",
    stripColors: false,
    subdomain: options.subdomain,
    tags: options.tags
  };
  logger.add(winston.transports.Loggly, logglyConfig);

  console.error = function() { logger.error.apply(logger, arguments); };
  console.info = function() { logger.info.apply(logger, arguments); };
  console.log = function() { logger.info.apply(logger, arguments); };
  console.warn = function() { logger.warn.apply(logger, arguments); };

  return logger;
}
