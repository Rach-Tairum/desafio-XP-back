const express = require('express');
const validateToken = require('../auth/validateToken');
const acoesController = require('../Controllers/acoesControler')

const rotaAcoes = express.Router();

rotaAcoes.get('/', acoesController.getAll);
rotaAcoes.put('/venda/:id', validateToken, acoesController.vendaDeAcoes);
rotaAcoes.put('/compra/:id', validateToken, acoesController.compraDeAcoes);

module.exports = rotaAcoes;