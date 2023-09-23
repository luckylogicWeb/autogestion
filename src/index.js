const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");

const router = require("./routes");
const { response } = require("./response");
const loggerExpress = require("./loggerExpress");

module.exports = async () => {
  const app = express();

  app.use(helmet());
  app.use(compression());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(response());
  app.use(loggerExpress());

  router(app);

  return app;
};
