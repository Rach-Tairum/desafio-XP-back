const express = require('express');
require('express-async-errors');
const errorHandler = require('../middlewares/errorHandler');

const rotas = express.Router();

rotas.use('/login', require('./loginRoute'));
rotas.use('/users', require('./users'));
rotas.use('/acoes', require('./acoes'));
rotas.use('/acoesUser', require('./acaoUser'));

rotas.use(errorHandler);

module.exports = rotas;