const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    // Update the role from 'user' to 'subcontractor' and 'admin' to 'contractor'
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Rename role enum
      await queryInterface.changeColumn(
        'user',
        'role',
        {
          type: DataTypes.STRING(20),
          validate: {
            isIn: [['contractor', 'subcontractor']],
          },
          allowNull: false,
        },
        { transaction },
      );

      // Update data
      await queryInterface.bulkUpdate(
        'user',
        { role: 'contractor' },
        { role: 'admin' },
        { transaction },
      );

      await queryInterface.bulkUpdate(
        'user',
        { role: 'subcontractor' },
        { role: 'user' },
        { transaction },
      );
    });
  },

  down: async (queryInterface) => {
    // Revert the role from 'subcontractor' to 'user' and 'contractor' to 'admin'
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Rename role enum back
      await queryInterface.changeColumn(
        'user',
        'role',
        {
          type: DataTypes.STRING(20),
          validate: {
            isIn: [['admin', 'user']],
          },
          allowNull: false,
        },
        { transaction },
      );

      // Revert data
      await queryInterface.bulkUpdate(
        'user',
        { role: 'admin' },
        { role: 'contractor' },
        { transaction },
      );

      await queryInterface.bulkUpdate(
        'user',
        { role: 'user' },
        { role: 'subcontractor' },
        { transaction },
      );
    });
  },
};
