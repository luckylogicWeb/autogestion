const buildErrorMessage = (errors) =>
  errors.map((error) => error.message).join(",");

const schemaValidator = (schema, propertiesLocation) => (req, res, next) => {
  const { error } = schema.validate(req[propertiesLocation]);

  if (error) {
    const { details } = error;
    const message = buildErrorMessage(details);

    return res.status(422).json({ error: message });
  }

  return next();
};

module.exports = schemaValidator;
