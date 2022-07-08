import config from '@/config/config';
import { Sequelize } from 'sequelize';

const { database, username, password } = config;
const sequelize = new Sequelize(database, username, password, {
  ...config,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    underscored: true,
  },
  logging: false,
});

export default sequelize;
