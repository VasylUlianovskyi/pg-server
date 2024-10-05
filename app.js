const express = require('express');
const { usersController } = require('./controllers/index,');
const { errorHandlers, validate } = require('./middleware');

const app = express();

app.use(express.json());

app.post('/users', validate.validationOnCreate, usersController.createUser);
app.get('/users', usersController.getAllUsers);
app.get('/users/:userId', usersController.getUserById);
app.patch('/users/:userId', usersController.updateUserById);
app.delete('/users/:userId', usersController.deleteUserById);

app.use(errorHandlers.errorHandler);

module.exports = app;
