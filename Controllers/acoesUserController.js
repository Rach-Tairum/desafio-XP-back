const acoesUserService = require('../Services/acoesUser.service');

const getAcoesUser = async (req, res) => {
  const { id } = req.params;
  const result = await acoesUserService.getUserInfos(id);

  res.status(200).json(result);
}

module.exports = {
  getAcoesUser,
}