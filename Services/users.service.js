const createToken = require('../auth/createToken');
const { User } = require('../models/index');

const getUserByEmail = async (email) => {
  const validUser = await User.findOne({ where: { email } });
  return validUser;
}

const getTokenValue = async ({ email, password }) => {
  const validUser = await getUserByEmail(email);

  const errorObj = { status: 400, message: 'Usuário Inválido ou senha Incorreta' };
  if (!validUser || validUser.password !== password) throw errorObj;

  const dataToValidate = {
    userId: validUser.id, 
    user: validUser.name, 
    email: validUser.email, 
  };

  const token = createToken(dataToValidate);

  return token;
};

const deposito = async ({ valorDeposito }, user) => {
  const person = await User.findByPk(user.data.userId); // Encontra o usuário
  if (!person) throw { status: 404, message: 'usuário não encontrado' }

  const newSaldo = person.saldo + Number(valorDeposito); // Pega o valor de saldo e acrescenta o valor recebido via depósito

  const retorno = await User.update({saldo: newSaldo}, {where: {id: user.data.userId}}); // Atualiza saldo do cliente
  if (!retorno) throw { status: 304, message: 'Saldo não atualizado' }

  return "Tudo certo! Valor depositado na conta"
}

const saque = async ({ valorSaque }, user) => {
  const person = await User.findByPk(user.data.userId); // Encontra o usuário
  if (!person) throw { status: 404, message: 'usuário não encontrado' }
  if (valorSaque > person.saldo) throw { status: 403, message: 'Saldo insuficiente' }

  const newSaldo = person.saldo - Number(valorSaque) // Pega o valor de saldo e reduz do valor sacado

  const retorno = await User.update({saldo: newSaldo}, {where: {id: user.data.userId}}); // Atualiza saldo do cliente
  if (!retorno) throw { status: 304, message: 'Saldo não atualizada' }

  return "Tudo certo! Valor sacado para conta de destino"
}

module.exports = {
  getTokenValue,
  getUserByEmail,
  deposito,
  saque,
}