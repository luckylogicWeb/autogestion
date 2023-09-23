const { get } = require("axios");

const logger = require("./logger");

const errorhandler = (error) => {
  logger.error(error.message);

  throw error(error.message);
};

const getRequest = async (url, config = {}) => {
  logger.info(`Request Get : ${url} with config : ${JSON.stringify(config)}`);

  return get(url, config).catch(errorhandler);
};

module.exports = {
  getRequest,
};
