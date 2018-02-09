const loggly = require("winston-loggly-bulk");
import * as util from "util";
import * as winston from "winston";

import { Config } from "../config";

export class Loggly {
  constructor(config: Config) {
    if (!config.loggly) {
      console.debug = console.log;
      return;
    }

    const logger = new winston.Logger({
      transports: [
        new (winston.transports.Console)({
          colorize: true,
          handleExceptions: true,
          humanReadableUnhandledException: true,
          json: false,
          level: config.loggly.level || "info"
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
    }, config.loggly);
    logger.add(winston.transports.Loggly, logglyConfig);

    console.log = function() { logger.info.apply(logger, arguments); };
    console.info = function() { logger.info.apply(logger, arguments); };
    console.warn = function() { logger.warn.apply(logger, arguments); };
    console.error = function() { logger.error.apply(logger, arguments); };
    console.debug = function() { logger.debug.apply(logger, arguments); };
  }
}
