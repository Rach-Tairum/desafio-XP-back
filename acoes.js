const express = require('express');
const acoesController = require('./Controllers/acoesControler')

const rotaAcoes = express.Router();

rotaAcoes.get('/', acoesController.getAll);

module.exports = rotaAcoes;