const express = require('express');
const { usersController } = require('./controllers/index,');

const app = express();

app.use(express.json());

app.post('/users', usersController.createUser);
app.get('/users', usersController.getAllUsers);
app.get('/users/:userId', usersController.getUserById);
app.patch('/users/:userId', usersController.updateUserById);
app.delete('/users/:userId', usersController.deleteUserById);

app.use((err, req, res, next) => {
  if (res.headersSEnt) {
    return;
  }
  const status = err.status ?? 500;
  const message = err.message ?? 'Server Error';

  res.status(status).send(message);
});

module.exports = app;
