const { TabelaAcoes } = require('../models/index');

const getAllAcoes = async () => {
  const result = await TabelaAcoes.findAll();

  return result;
};

module.exports = {
  getAllAcoes,
}