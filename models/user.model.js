const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
    }
  );
  return User;
};
