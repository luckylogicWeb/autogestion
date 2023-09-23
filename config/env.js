require("dotenv").config();

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL || 30,
  port: process.env.APPLICATION_PORT || 8080,
  apiAutoGestion: {
    baseUrl: process.env.AUTO_GESTION_URL,
    cookie: process.env.COOKIE,
    consumerKey: process.env.AUTO_GESTION_CONSUMER_KEY,
    consumerSecret: process.env.AUTO_GESTION_CONSUMER_SECRET,
  },
};
