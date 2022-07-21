const userService = require('../Services/users.service');

const getUser = async (req, res) => {
  const { q } = req.query;
  
  const user = await userService.getUserByEmail(q);

  const dataUser = {
    userId: user.id,
    userName: user.name,
    saldo: user.saldo,
  }

  res.status(200).json(dataUser);
}

const validToken = (_req, res) => {
  res.status(200).json({message: 'OK'})
}

const doneDeposit = async (req, res) => {
  const result = await userService.deposito(req.body, res.locals.user)

  res.status(201).json(result);
}

const doneWithdraw = async (req, res) => {
  const result = await userService.saque(req.body, res.locals.user);

  res.status(201).json(result);
}

module.exports = {
  getUser,
  validToken,
  doneDeposit,
  doneWithdraw,
}