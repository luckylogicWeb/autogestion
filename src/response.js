const isSuccess = (statusCode) => statusCode >= 200 && statusCode < 300;

const formatResponse = (success, data) => ({
  success,
  data,
  timestamp: Date.now(),
});

const errorResponse = (res, statusCode, data) =>
  res.status(statusCode).json(formatResponse(false, data));

const successResponse = (res, statusCode, data) =>
  res.status(statusCode).json(formatResponse(true, data));

const response = () => (req, res, next) => {
  const originalJsonMethod = res.json;

  res.json = (jsonResponse, ...rest) => {
    const { statusCode } = res;

    const newJsonResponse = formatResponse(isSuccess(statusCode), jsonResponse);

    res.responseData = newJsonResponse;

    return originalJsonMethod.apply(res, [newJsonResponse, ...rest]);
  };

  next();
};

module.exports = {
  errorResponse,
  successResponse,
  response,
};
