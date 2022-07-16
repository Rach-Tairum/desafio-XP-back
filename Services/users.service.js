const createToken = require('../auth/createToken');
const { User } = require('../models/index');

const getTokenValue = async ({ email, password }) => {
  const validUser = await User.findOne({ where: { email } });

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

module.exports = {
  getTokenValue,
}