const express = require('express');
const usersController = require('./Controllers/usersController')

const rotaUsers = express.Router();

rotaUsers.get('/email', usersController.getUser);

module.exports = rotaUsers;