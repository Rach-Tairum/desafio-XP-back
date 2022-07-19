const { AcoesUsers } = require('../models/index');

const getUserInfos = (id) => {
  const infos = AcoesUsers.findAll({
    where:{ userId: id },
  });

  return infos;
}

module.exports = {
  getUserInfos,
}