import config, { NodeEnv } from '@config/config';
import { Sequelize } from 'sequelize';

const nodeEnv = (process.env.NODE_ENV as NodeEnv) || 'development';
const { database, username, password } = config[nodeEnv];

const sequelize = new Sequelize(database, username, password, config[nodeEnv]);

const db = {
  sequelize,
  Sequelize,
};

module.exports = db;
