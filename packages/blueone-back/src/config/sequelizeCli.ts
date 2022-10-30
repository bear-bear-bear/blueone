import { execSync } from 'child_process';
import { mkdir, writeFile } from 'fs';
import path from 'path';

import { sync as rm } from 'del';

import config from '@/config/config';

/**
 * @desc 임의의 json 을 생성하여 sequelize-cli 명령어를 수행합니다.
 */
export default function sequelizeCli(command: string, doneLog: string) {
  const rootDir = path.join(__dirname, '..', '..'); // 🚩 High risk, because path is relative
  const json = JSON.stringify(config);
  const dirname = path.join(rootDir, 'config');

  rm(dirname);

  mkdir(dirname, (err) => {
    if (err) throw err;
    writeFile(path.join(dirname, 'config.json'), json, (error) => {
      if (error) throw error;
      execSync(`npx sequelize-cli ${command}`);
      rm(dirname);
      console.log(doneLog);
    });
  });
}
