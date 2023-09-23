const pino = require("pino");

const { nodeEnv, logLevel } = require("../config/env");

const logger = pino({
  prettyPrint: { translateTime: true },
  level: logLevel,
  enabled: nodeEnv !== "test",
});

module.exports = logger;
