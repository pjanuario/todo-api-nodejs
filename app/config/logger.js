const config = require('./config');
const winston = require('winston');

winston.emitErrs = true;

'use strict';

const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: config.logging.level,
            filename: config.logging.file,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: config.logging.level,
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;