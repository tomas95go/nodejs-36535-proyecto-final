const winston = require("winston");
const path = require("path");
const logDirectory = path.join(__dirname, "..", "logs");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: `${logDirectory}/combined.log`,
      level: "warn",
    }),
    new winston.transports.File({
      filename: `${logDirectory}/combined.log`,
      level: "error",
    }),
  ],
});

module.exports = logger;
