const express = require('express');
const validateToken = require('../auth/validateToken');
const usersController = require('../Controllers/usersController');
const validateInfoDeposito = require('../middlewares/validateInfoDeposito');
const validateInfoSaque = require('../middlewares/validateInfoSaque');

const rotaUsers = express.Router();

rotaUsers.get('/email', usersController.getUser);
rotaUsers.get('/validate', validateToken, usersController.validToken);
rotaUsers.put('/deposito', validateInfoDeposito, validateToken, usersController.doneDeposit);
rotaUsers.put('/saque', validateInfoSaque, validateToken, usersController.doneWithdraw);
module.exports = rotaUsers;