import sequelize from './_sequelize';
import { Sequelize } from 'sequelize';
import User from './user';
import UserInfo from './userInfo';
import Notice from './notice';
import Work from './work';

const db = {
  User,
  UserInfo,
  Notice,
  Work,
  sequelize,
  Sequelize,
};

User.associate(db);
UserInfo.associate(db);
Notice.associate(db);
Work.associate(db);

export type Database = typeof db;
export default db;
