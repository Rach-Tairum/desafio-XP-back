const acoesService = require('../Services/acoes.service');

const getAll = async (_req, res) => {
  const acoes = await acoesService.getAllAcoes();

  res.status(200).json(acoes);
};

const vendaDeAcoes = async (req, res) => {
  const { id } = req.params

  const result = await acoesService.vendaAcao(id, req.body, res.locals.user)

  res.status(201).json(result);
}

const compraDeAcoes = async (req, res) => {
  const { id } = req.params

  const result = await acoesService.compraAcao(id, req.body, res.locals.user)

  res.status(201).json(result);
}

module.exports = {
  getAll,
  vendaDeAcoes,
  compraDeAcoes,
}