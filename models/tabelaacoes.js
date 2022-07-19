const TabelaAcoes = (sequelize, DataTypes) => {
  const TabelaAcoes = sequelize.define("TabelaAcoes", {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    },
    nomeEmpresa: DataTypes.STRING,
    qtdAcoes: DataTypes.INTEGER,
    valorAcao: DataTypes.DOUBLE
  },
  {
    timestamps: false,
    tableName: 'TabelaAcoes',
  });

  return TabelaAcoes;
};

module.exports = TabelaAcoes;