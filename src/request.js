const { get } = require("axios");
const https = require("https");

const logger = require("./logger");

const errorhandler = (error) => {
  logger.error(error.message);

  throw error(error.message);
};

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const getRequest = async (url, config = {}) => {
  logger.info(`Request Get : ${url} with config : ${JSON.stringify(config)}`);

  return get(url, { httpsAgent, ...config }).catch(errorhandler);
};

module.exports = {
  getRequest,
};
