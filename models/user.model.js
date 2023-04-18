const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      university: {
        type: DataTypes.STRING,
        allowNull: false
      },
      course: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: false
      },
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
      },
      scopes: {
        withPass: {
          // where: {
          //   deleted: true
          // }
        },
      }
    }
  );

    User.beforeCreate(async (user, options) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    })

  return User;
};
