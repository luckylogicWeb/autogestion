const pino = require("pino");

const { nodeEnv } = require("../config/env");

const logger = pino({
  prettyPrint: { translateTime: true },
  enabled: nodeEnv !== "test",
});

module.exports = logger;
