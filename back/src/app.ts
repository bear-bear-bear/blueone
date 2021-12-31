import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';
import fileStoreFactory from 'session-file-store';
const FileStore = fileStoreFactory(session);
import dotenv from 'dotenv';
dotenv.config();

import db from '@/models';
import { userRouter, usersRouter, worksRouter, noticeRouter } from '@/routes';
import { errorHandler, errorLogger } from '@/middlewares';
import passportConfig from '@/auth';
passportConfig();

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: ['https://blueone.vercel.app'],
      credentials: true,
    }),
  );
  app.use(
    session({
      saveUninitialized: true,
      resave: false,
      secret: process.env.COOKIE_SECRET as string,
      proxy: true,
      cookie: {
        httpOnly: true,
        secure: true,
        domain: '.blueone.vercel.app',
        maxAge: 14 * (24 * 60 * 60 * 1000),
        sameSite: 'none',
      },
      store: new FileStore({}),
    }),
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
  app.use(
    session({
      saveUninitialized: true,
      resave: false,
      secret: process.env.COOKIE_SECRET as string,
      cookie: {
        httpOnly: true,
        maxAge: 14 * (24 * 60 * 60 * 1000),
      },
      store: new FileStore({}),
    }),
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/works', worksRouter);
app.use('/notice', noticeRouter);
app.use(errorLogger);
app.use(errorHandler);

app.listen('8001', () => {
  console.log('🛡️  Server listening on port: 8001 🛡️');
});
