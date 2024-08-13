import sequelizeCli from '@/config/sequelize-cli';

if (process.argv.includes('--create')) {
  sequelizeCli('db:create', '데이터베이스 생성 완료');
}

if (process.argv.includes('--migrate')) {
  sequelizeCli('db:migrate', '데이터베이스 마이그레이션 완료');
}
