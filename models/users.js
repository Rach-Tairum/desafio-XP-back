
const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    saldo: DataTypes.DOUBLE
  },
  {
    timestamps: false,
    tableName: 'Users'
  });

  return User;
};

module.exports = User;