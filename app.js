const express = require('express');
const { usersController, phonesController } = require('./controllers/index,');
const { errorHandlers, validate, paginate } = require('./middleware');
const queryParser = require('query-parser-express');

const app = express();

app.use(express.json());

app.use(
  queryParser({
    parseBoolean: true,
    parseNumber: true,
  })
);

app.post('/users', validate.validationOnCreate, usersController.createUser);
app.get('/users', paginate.paginateUsers, usersController.getAllUsers);
app.get('/users/:userId', usersController.getUserById);
app.patch('/users/:userId', usersController.updateUserById);
app.delete('/users/:userId', usersController.deleteUserById);

app.post(
  '/phones',
  validate.validationOnCreatePhone,
  phonesController.createPhone
);
app.get('/phones', paginate.paginatePhones, phonesController.getAllPhones);
app.get('/phones/:phoneId', phonesController.getPhoneById);
app.patch(
  '/phones/:phoneId',
  validate.validationOnUpdatePhone,
  phonesController.updatePhoneById
);
app.delete('/phones/:phoneId', phonesController.deletePhoneById);

app.get('/users/:userId/phones', usersController.getUserPhones);

app.use(errorHandlers.errorHandler);

module.exports = app;
