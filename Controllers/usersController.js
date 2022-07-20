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

module.exports = {
  getUser,
  validToken,
}