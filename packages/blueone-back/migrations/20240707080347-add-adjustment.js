const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('work', 'adjustment', {
      type: DataTypes.MEDIUMINT,
      allowNull: true,
    });
  },
};
