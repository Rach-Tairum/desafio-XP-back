const AcoesUsers = (sequelize, DataTypes) => {
  const AcoesUsers = sequelize.define("AcoesUsers", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true, 
      foreignKey: true
    },
    acaoId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true, 
      foreignKey: true
    },
    qtdAcoesCompradas: DataTypes.INTEGER,
    valorTotalCompra: DataTypes.DOUBLE
  },
  {
    timestamps: false,
    tableName: 'AcoesUsers',
  });

  AcoesUsers.associate = (models) => {
    models.Users.belongsToMany(models.TabelaAcoes, {
      as: "users",
      through: AcoesUsers,
      foreignKey: "userId",
      otherKey: "acaoId"
    });

    models.TabelaAcoes.belongsToMany(models.Users, {
      as: "tabelaacoes",
      through: AcoesUsers,
      foreignKey: "acaoId",
      otherKey: "userId"
    })
  }

  return AcoesUsers;
};

module.exports = AcoesUsers;