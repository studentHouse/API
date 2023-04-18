const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  Group = sequelize.define(
    "Group",
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    }
  );
  Group.sync();
  return Group;
};
