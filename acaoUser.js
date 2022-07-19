const express = require('express');
const acoesUserController = require('./Controllers/acoesUserController')

const rotaAcoesUser = express.Router();

rotaAcoesUser.get('/:id', acoesUserController.getAcoesUser);

module.exports = rotaAcoesUser;