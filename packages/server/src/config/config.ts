import dotenv from 'dotenv';
import type { Dialect } from 'sequelize';
dotenv.config();

type NodeEnv = 'development' | 'production';
type EnvOptions = {
  username: string;
  database: string;
  password: string;
  host: string;
  dialect: Dialect;
};
type SequelizeConfig = {
  [key in NodeEnv]: EnvOptions;
};

const { env } = process;
const nodeEnv = (env.NODE_ENV as NodeEnv) || 'development';

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

const isUndefinedValue = Object.values(config[nodeEnv] as EnvOptions).find(
  (v) => v === undefined,
);
if (isUndefinedValue) {
  throw new Error('데이터베이스 필수 환경 설정 값이 누락되었습니다.');
}

export default config[nodeEnv];
