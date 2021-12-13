import dotenv from 'dotenv';
import type { Dialect } from 'sequelize';
dotenv.config();

export type NodeEnv = 'development' | 'production';
export type SequelizeConfig = {
  [key in NodeEnv]: {
    username: string;
    database: string;
    password: string;
    host: string;
    dialect: Dialect;
  };
};

const { env } = process;

const config: SequelizeConfig = {
  development: {
    username: 'root',
    database: env.DB_NAME as string,
    password: env.DB_PASSWORD as string,
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    database: env.DB_NAME as string,
    password: env.DB_PASSWORD as string,
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

export default config;
