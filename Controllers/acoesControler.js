const acoesService = require('../Services/acoes.service');

const getAll = async (_req, res) => {
  const acoes = await acoesService.getAllAcoes();

  res.status(200).json(acoes);
};

module.exports = {
  getAll,
}