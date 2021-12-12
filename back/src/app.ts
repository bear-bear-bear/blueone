import express, { Request, Response } from 'express';
// import path from 'path';
// import session from 'express-session';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import morgan from 'morgan';
// import hpp from 'hpp';
// import helmet from 'helmet';

const app = express();

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
