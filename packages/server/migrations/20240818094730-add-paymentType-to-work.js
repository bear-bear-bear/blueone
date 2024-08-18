const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('work', 'payment_type', {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'DIRECT',
      validate: {
        isIn: [['DIRECT', 'CASH']],
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('work', 'payment_type');
  },
};
