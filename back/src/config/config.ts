import dotenv from 'dotenv';
import type { Dialect } from 'sequelize';
import { sync as rm } from 'del';
import path from 'path';
import { mkdir, writeFile } from 'fs';
import { execSync } from 'child_process';
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

/**
 * @desc 임의의 json 을 생성하여 npx sequelize db:create 명령어를 수행합니다.
 */
const createDatabase = () => {
  const rootDir = path.join(__dirname, '..', '..'); // 🚩 High risk, because path is relative
  const sequelizeConfigJson = JSON.stringify(config[nodeEnv]);
  const sequelizeConfigDirname = path.join(rootDir, 'config');

  rm(sequelizeConfigDirname);

  mkdir(sequelizeConfigDirname, (err) => {
    if (err) throw err;
    writeFile(
      path.join(sequelizeConfigDirname, 'config.json'),
      sequelizeConfigJson,
      (error) => {
        if (error) throw error;
        execSync('npx sequelize-cli db:create');
        rm(sequelizeConfigDirname);
        console.log('데이터베이스 생성완료');
      },
    );
  });
};

if (process.argv.includes('--create')) {
  createDatabase();
}
