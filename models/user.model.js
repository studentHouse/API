const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
