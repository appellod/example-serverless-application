import * as winston from "winston";
import "winston-loggly-bulk";

export const isConfigured = process.env.LOGGLY_INPUT_TOKEN &&
  process.env.LOGGLY_SUBDOMAIN &&
  process.env.LOGGLY_TAGS;

export function setup() {
  if (!isConfigured) {
    throw new Error("Configuration parameters are missing for Loggly support.");
  }

  const logger = new winston.Logger({
    transports: [
      new (winston.transports.Console)({
        colorize: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: false,
        level: process.env.LOGGLY_LEVEL || "info"
      })
    ]
  });

  const logglyConfig = Object.assign({
    handleExceptions: true,
    humanReadableUnhandledException: true,
    isBulk: false,
    json: true,
    level: "info",
    stripColors: false
  }, {
    inputToken: process.env.LOGGLY_INPUT_TOKEN,
    subdomain: process.env.LOGGLY_SUBDOMAIN,
    tags: process.env.LOGGLY_TAGS.split(",")
  });
  logger.add(winston.transports.Loggly, logglyConfig);

  console.log = function() { logger.info.apply(logger, arguments); };
  console.info = function() { logger.info.apply(logger, arguments); };
  console.warn = function() { logger.warn.apply(logger, arguments); };
  console.error = function() { logger.error.apply(logger, arguments); };
}
