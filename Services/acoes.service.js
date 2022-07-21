const { TabelaAcoes, AcoesUsers, User } = require('../models/index');

// Busca todas as ações presentes no banco
const getAllAcoes = async () => {
  const result = await TabelaAcoes.findAll({order: [['id']]});

  return result;
};

const vendaAcao = async (idEmpresa, { qtdVendida, valorVenda }, user) => {
  // Passo 1 - Encontrar a empresa e as ações que ela tem 
  const empresa = await TabelaAcoes.findByPk(idEmpresa);
  if (!empresa) throw { status: 404, message: 'empresa não encontrada' }
  // Passo 2 - Soma a quantidade que tem na empresa mais a venda do acionista
  const newQtd = empresa.qtdAcoes + Number(qtdVendida)
  // Passo 3 - Adiciona na tabela a nova quantidade
  const result = await TabelaAcoes.update({qtdAcoes: newQtd}, {where: {id: idEmpresa}});
  if (!result) throw { status: 304, message: 'Ação não atualizada' }

  // Passo 4 - Altera saldo do usuário
  const person = await User.findByPk(user.data.userId); // Encontra o usuário
  if (!person) throw { status: 404, message: 'usuário não encontrado' }

  const newSaldo = person.saldo + Number(valorVenda); // Pega o valor de saldo e acrescenta o valor recebido pela venda das ações

  const retorno = await User.update({saldo: newSaldo}, {where: {id: user.data.userId}}); // Atualiza saldo do cliente
  if (!retorno) throw { status: 304, message: 'Saldo não atualizado' }

  // Passo 5 - Altera tabela de ligação
  const association = await AcoesUsers.findOne({where: {userId: user.data.userId, acaoId: idEmpresa}}) // Busca se aquela ação já é do usuário
  if (association.qtdAcoesCompradas === Number(qtdVendida)) { // Se forem vendidas todas as ações que o usuário tem da empresa, a linha e removida da tabela de ligação
    await AcoesUsers.destroy({where: {userId: user.data.userId, acaoId: idEmpresa}})
  } else { // Se nem todas as ações forem vendidas a tabela de ligação é atualizada com os novos valores das ações do cliente.
    const qtdUser = association.qtdAcoesCompradas - Number(qtdVendida)
    const newVenda = association.valorTotalCompra - Number(valorVenda)
    const upAcoesUser = await AcoesUsers.update(
      {qtdAcoesCompradas: qtdUser, valorTotalCompra: newVenda}, 
      {where: {userId: user.data.userId, acaoId: idEmpresa}}
    );
    if (!upAcoesUser) throw { status: 304, message: 'Tabela acoesUser não atualizada' }
  }

  return "Tudo certo! Pode voltar a página principal"
}

const compraAcao = async (idEmpresa, { qtdComprada, valorCompra }, user) => {
  // Passo 1 - Encontrar a empresa e as ações que ela tem 
  const empresa = await TabelaAcoes.findByPk(idEmpresa);
  if (!empresa) throw { status: 404, message: 'empresa não encontrada' }
  // Passo 2 - reduz a quantidade que tem na empresa mais a compra do acionista
  const newQtd = empresa.qtdAcoes - Number(qtdComprada)
  // Passo 3 - Adiciona na tabela a nova quantidade
  const result = await TabelaAcoes.update({qtdAcoes: newQtd}, {where: {id: idEmpresa}});
  if (!result) throw { status: 304, message: 'Ação não atualizada' }

  // Passo 4 - Altera saldo do usuário
  const person = await User.findByPk(user.data.userId); // Encontra o usuário
  if (!person) throw { status: 404, message: 'usuário não encontrado' }
  if (Number(valorCompra) > person.saldo) throw { status: 403, message: 'Saldo insuficiente' }

  const newSaldo = person.saldo - Number(valorCompra) // Pega o valor de saldo e reduz do valor pago pelas ações

  const retorno = await User.update({saldo: newSaldo}, {where: {id: user.data.userId}}); // Atualiza saldo do cliente
  if (!retorno) throw { status: 304, message: 'Saldo não atualizada' }

  // Passo 5 - Altera tabela de ligação
  const association = await AcoesUsers.findOne({where: {userId: user.data.userId, acaoId: idEmpresa}}) // Busca se aquela compra já existe
  if (!association) { // Se não existir cria uma nova linha na tabela com a compra da ação
    const value = await AcoesUsers.create({
      userId: user.data.userId, 
      acaoId: idEmpresa, 
      qtdAcoesCompradas: Number(qtdComprada), 
      valorTotalCompra: Number(valorCompra)
    })
    if (!value) throw { status: 304, message: 'Tabela acoesUser não atualizada' }
  } else { // Se a compra já foi feita anteriormente só altera para aumentar a quantidade de ações daquela empresa que o usuário possui
    const qtdUser = association.qtdAcoesCompradas + Number(qtdComprada)
    const newVenda = association.valorTotalCompra + Number(valorCompra)
    const upAcoesUser = await AcoesUsers.update(
      {qtdAcoesCompradas: qtdUser, valorTotalCompra: newVenda}, 
      {where: {userId: user.data.userId, acaoId: idEmpresa}}
    );
    if (!upAcoesUser) throw { status: 304, message: 'Tabela acoesUser não atualizada' }
  }

  return "Tudo certo! Pode voltar a página principal"
}

module.exports = {
  getAllAcoes,
  vendaAcao,
  compraAcao,
}