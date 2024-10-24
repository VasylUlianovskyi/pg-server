const createHttpError = require('http-errors');
const { Phone } = require('./../models');

module.exports.createPhone = async (req, res, next) => {
  const { body } = req;
  try {
    const createdPhone = await Phone.create(body);
    res.status(201).send({
      message: 'Phone created successfully',
      phone: createdPhone,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllPhones = async (req, res, next) => {
  const { limit, offset } = req.pagination;

  try {
    const foundPhones = await Phone.getAll(limit, offset);

    res.status(200).send(foundPhones);
  } catch (err) {
    next(err);
  }
};

module.exports.getPhoneById = async (req, res, next) => {
  const { phoneId } = req.params;
  try {
    const foundPhone = await Phone.getById(phoneId);
    if (!foundPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }
    res.status(200).send(foundPhone);
  } catch (err) {
    next(err);
  }
};

module.exports.updatePhoneById = async (req, res, next) => {
  const {
    params: { phoneId },
    body,
  } = req;

  try {
    const updatedPhone = await Phone.updateById(body, phoneId);

    if (!updatedPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    res.status(200).send(updatedPhone);
  } catch (err) {
    next(err);
  }
};

module.exports.deletePhoneById = async (req, res, next) => {
  const { phoneId } = req.params;
  try {
    const foundPhone = await Phone.deleteById(phoneId);
    if (!foundPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }
    res.status(204).send('Phone Deleted');
  } catch (err) {
    next(err);
  }
};
