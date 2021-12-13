import config from '@/config/config';
import { Sequelize } from 'sequelize';

const { database, username, password } = config;

const sequelize = new Sequelize(database, username, password, config);

const db = {
  sequelize,
  Sequelize,
};

export default db;
