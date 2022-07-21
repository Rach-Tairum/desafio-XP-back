const acoesService = require('../Services/acoes.service');

// Busca e exibe todas as ações
const getAll = async (_req, res) => {
  const acoes = await acoesService.getAllAcoes();

  res.status(200).json(acoes);
};

const vendaDeAcoes = async (req, res) => {
  const { id } = req.params
  // Envia o id da empresa que vem por parâmetro, a quantidade de ações vendidas, o valor pago por essas ações e dados do usuário (id, nome e email)
  const result = await acoesService.vendaAcao(id, req.body, res.locals.user)

  res.status(201).json(result);
}

const compraDeAcoes = async (req, res) => {
  const { id } = req.params

   // Envia o id da empresa que vem por parâmetro, a quantidade de ações compradas, o valor pago por essas ações e dados do usuário (id, nome e email)
  const result = await acoesService.compraAcao(id, req.body, res.locals.user)

  res.status(201).json(result);
}

module.exports = {
  getAll,
  vendaDeAcoes,
  compraDeAcoes,
}