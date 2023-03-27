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
      token: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      defaultScope: {
        attributes: { exclude: ['password', 'token'] },
      }
    }
  );

    User.beforeCreate(async (user, options) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    })

  return User;
};
