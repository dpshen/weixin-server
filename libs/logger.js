const log4js = require('log4js');
const logDirectory = require('../config').logDirectory;

var log4jsconf = {
    appenders: [
        // {type: "console"},
        {
            type: "dateFile",
            filename: logDirectory,
            pattern: "/yyyy-MM-dd-err.log",
            alwaysIncludePattern: true,
            category: "ERROR"
        },
        {
            type: "dateFile",
            filename: logDirectory,
            pattern: "/yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            category: "TRACE"
        }
    ],
    replaceConsole: true,
    levels: {
        "TRACE": "TRACE",
        "ERROR": "ERROR"
    }
};

// dev模式时 日志同时打印到终端
if (process.argv[2] && process.argv[2].includes("dev")) {
    log4jsconf.appenders.push({type: "console"})
}

log4js.configure(log4jsconf);
var logger = log4js.getLogger('TRACE');
var errLogger = log4js.getLogger('ERROR');

var _error = logger.error;
logger.error = function () {
    _error.apply(logger, arguments);
    errLogger.error.apply(errLogger, arguments);
};

module.exports = logger;