const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models/index');

const validateToken = async (req, res, next) => {
  // Passo 1: verifica se existe a chave authorization
  const headersKeys = Object.keys(req.headers);
  const errorObj = { status: 401, message: 'Token não encontrado' };
  if (!headersKeys.includes('authorization')) throw errorObj;

  // Passo 2: verifica se o token foi passado
  const token = req.headers.authorization;
  if (!token) throw errorObj;

  // Passo 3: Verifica se o token é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    const errorObj2 = { status: 401, message: 'Seção Expirada' };
    if (err) throw errorObj2;
    
    res.locals.user = decoded;
  });

  const user = await User.findByPk(res.locals.user.data.userId);
  const errorObj2 = { status: 404, 
    message: `Usuáriio ${res.locals.user.data.user} não mais existe, por favor, faça um novo cadastro` };
  if (!user) throw errorObj2;

  next();
};

module.exports = validateToken;