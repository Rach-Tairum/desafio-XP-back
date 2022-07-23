const express = require('express');
const validateInfoToken = require('../middlewares/validateTokenInfo');
const takeLoginToken = require('../Controllers/loginUserToken');

const rotaLogin = express.Router();

rotaLogin.post('/', validateInfoToken, takeLoginToken.getToken);

module.exports = rotaLogin;