const express = require('express');
const validateToken = require('./auth/validateToken');
const usersController = require('./Controllers/usersController')

const rotaUsers = express.Router();

rotaUsers.get('/email', usersController.getUser);
rotaUsers.get('/validate', validateToken, usersController.validToken);

module.exports = rotaUsers;