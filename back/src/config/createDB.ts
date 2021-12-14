import path from 'path';
import { sync as rm } from 'del';
import { mkdir, writeFile } from 'fs';
import { execSync } from 'child_process';
import config from '@/config/config';

/**
 * @desc 임의의 json 을 생성하여 npx sequelize db:create 명령어를 수행합니다.
 */
const createDatabase = () => {
  const rootDir = path.join(__dirname, '..', '..'); // 🚩 High risk, because path is relative
  const sequelizeConfigJson = JSON.stringify(config);
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
