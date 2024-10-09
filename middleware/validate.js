const createHttpError = require('http-errors');
const {
  CREATE_USER_VALIDATION_SCHEMA,
  CREATE_PHONE_VALIDATION_SCHEMA,
  PHONE_UPDATE_SCHEMAS,
} = require('../utils/validatesSchemas');

module.exports.validationOnCreate = async (req, res, next) => {
  const { body } = req;

  try {
    const validatedUser = await CREATE_USER_VALIDATION_SCHEMA.validate(body);
    req.body = validatedUser;
    next();
  } catch (err) {
    next(createHttpError(422, err));
  }
};

module.exports.validationOnCreatePhone = async (req, res, next) => {
  const { body } = req;

  try {
    const validatedPhone = await CREATE_PHONE_VALIDATION_SCHEMA.validate(body);
    req.body = validatedPhone;
    next();
  } catch (err) {
    next(createHttpError(422, err));
  }
};

module.exports.validationOnUpdatePhone = async (req, res, next) => {
  const { body } = req;

  try {
    const validatedPhone = await PHONE_UPDATE_SCHEMAS.validate(body);
    req.body = validatedPhone;
    next();
  } catch (err) {
    next(createHttpError(422, err));
  }
};
