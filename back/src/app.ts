import express, { Request, Response } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: ['https://example.com'],
      credentials: true,
    }),
  );
  app.use(
    session({
      saveUninitialized: false,
      resave: false,
      secret: process.env.COOKIE_SECRET as string,
      proxy: true,
      cookie: {
        httpOnly: true,
        secure: true,
        domain: '.example.com',
      },
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
      saveUninitialized: false,
      resave: false,
      secret: process.env.COOKIE_SECRET as string,
    }),
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/welcome', (req: Request, res: Response) => {
  res.send('welcome!');
});

app.listen('8001', () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 8001🛡️
  ################################################
`);
});
