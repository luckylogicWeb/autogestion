const logger = require("./logger");

const isError = (statusCode) => !(statusCode >= 200 && statusCode < 300);

const logResponse = (traceObj, msg = "") => {
  const { statusCode = 200 } = traceObj;

  if (isError(statusCode)) {
    logger.error(traceObj, msg);
  } else {
    logger.info(traceObj, msg);
  }
};

const getDefaultLog = (req, res) => ({
  time: new Date().toUTCString(),
  from:
    req.headers["x-forwarded-for"] || req.connection
      ? req.connection.remoteAddress
      : "",
  method: req.method,
  originalUri: req.originalUrl,
  uri: req.url,
  requestData: req.body,
  statusCode: res.statusCode,
  referer: req.headers.referer || "",
  userAgent: req.headers["user-agent"],
});

const loggerExpress = () => {
  return (req, res, next) => {
    res.on("finish", () => {
      const { responseData = "" } = res;
      const defaultLog = getDefaultLog(req, res);

      try {
        const msg = JSON.stringify(responseData);
        logResponse(defaultLog, msg);
      } catch (e) {
        logResponse(defaultLog);
      }
    });

    next();
  };
};

module.exports = loggerExpress;
