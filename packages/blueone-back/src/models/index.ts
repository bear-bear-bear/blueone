import { Sequelize } from 'sequelize';
import sequelize from './_sequelize';
import Notice from './notice';
import User from './user';
import UserInfo from './userInfo';
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

export { User, UserInfo, Notice, Work };
export type Database = typeof db;
export default db;
