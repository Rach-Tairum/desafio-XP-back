const { TabelaAcoes, AcoesUsers, User } = require('../models/index');

const getAllAcoes = async () => {
  const result = await TabelaAcoes.findAll();

  return result;
};

const vendaAcao = async (idEmpresa, { qtdVendida, valorVenda }, user) => {
  // Passo 1 - Encontrar a empresa e as ações que ela tem 
  const empresa = await TabelaAcoes.findByPk(idEmpresa);
  if (!empresa) throw { status: 500, message: 'empresa não encontrada' }
  // Passo 2 - Soma a quantidade que tem na empresa mais a venda do acionista
  const newQtd = empresa.qtdAcoes + Number(qtdVendida)
  // Passo 3 - Adiciona na tabela a nova quantidade
  const result = await TabelaAcoes.update({qtdAcoes: newQtd}, {where: {id: idEmpresa}});
  if (!result) throw { status: 500, message: 'Ação não atualizada' }

  // Passo 4 - Altera saldo do usuário
  const person = await User.findByPk(user.data.userId);
  if (!person) throw { status: 500, message: 'usuário não encontrado' }

  const newSaldo = person.saldo + Number(valorVenda)

  const retorno = await User.update({saldo: newSaldo}, {where: {id: user.data.userId}});
  if (!retorno) throw { status: 500, message: 'Saldo não atualizada' }

  // Passo 5 - Altera tabela de ligação
  const association = await AcoesUsers.findOne({where: {userId: user.data.userId, acaoId: idEmpresa}})
  if (association.qtdAcoesCompradas === Number(qtdVendida)) {
    await AcoesUsers.destroy({where: {userId: user.data.userId, acaoId: idEmpresa}})
  } else {
    const qtdUser = association.qtdAcoesCompradas - Number(qtdVendida)
    const newVenda = association.valorTotalCompra - Number(valorVenda)
    const upAcoesUser = await AcoesUsers.update(
      {qtdAcoesCompradas: qtdUser, valorTotalCompra: newVenda}, 
      {where: {userId: user.data.userId, acaoId: idEmpresa}}
    );
    if (!upAcoesUser) throw { status: 500, message: 'Tabela acoesUser não atualizada' }
  }

  return "Tudo certo! Pode voltar a página principal"
}

const compraAcao = async (idEmpresa, { qtdComprada, valorCompra }, user) => {
  // Passo 1 - Encontrar a empresa e as ações que ela tem 
  const empresa = await TabelaAcoes.findByPk(idEmpresa);
  if (!empresa) throw { status: 500, message: 'empresa não encontrada' }
  // Passo 2 - reduz a quantidade que tem na empresa mais a compra do acionista
  const newQtd = empresa.qtdAcoes - Number(qtdComprada)
  // Passo 3 - Adiciona na tabela a nova quantidade
  const result = await TabelaAcoes.update({qtdAcoes: newQtd}, {where: {id: idEmpresa}});
  if (!result) throw { status: 500, message: 'Ação não atualizada' }

  // Passo 4 - Altera saldo do usuário
  const person = await User.findByPk(user.data.userId);
  if (!person) throw { status: 500, message: 'usuário não encontrado' }

  const newSaldo = person.saldo - Number(valorCompra)

  const retorno = await User.update({saldo: newSaldo}, {where: {id: user.data.userId}});
  if (!retorno) throw { status: 500, message: 'Saldo não atualizada' }

  // Passo 5 - Altera tabela de ligação
  const association = await AcoesUsers.findOne({where: {userId: user.data.userId, acaoId: idEmpresa}})
  if (!association) {
    const value = await AcoesUsers.create({
      userId: user.data.userId, 
      acaoId: idEmpresa, 
      qtdAcoesCompradas: Number(qtdComprada), 
      valorTotalCompra: Number(valorCompra)
    })
    if (!value) throw { status: 500, message: 'Tabela acoesUser não atualizada' }
  } else {
    const qtdUser = association.qtdAcoesCompradas + Number(qtdComprada)
    const newVenda = association.valorTotalCompra + Number(valorCompra)
    const upAcoesUser = await AcoesUsers.update(
      {qtdAcoesCompradas: qtdUser, valorTotalCompra: newVenda}, 
      {where: {userId: user.data.userId, acaoId: idEmpresa}}
    );
    if (!upAcoesUser) throw { status: 500, message: 'Tabela acoesUser não atualizada' }
  }
  return "Tudo certo! Pode voltar a página principal"
}

module.exports = {
  getAllAcoes,
  vendaAcao,
  compraAcao,
}