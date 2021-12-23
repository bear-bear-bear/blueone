import type { RequestHandler, ErrorRequestHandler } from 'express';

export const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      message: '로그인이 필요합니다.',
    });
  }
};

export const isNotLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      message: '로그인하지 않은 사용자만 접근 가능합니다.',
    });
  }
};

export const isAdmin: RequestHandler = (req, res, next) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      message: '어드민만 접근 가능합니다.',
    });
  }
};

export const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  console.error('[' + new Date() + ']\n' + err.stack);
  next(err);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  res.status(err.status || 500);
  res.send(err.message || 'Server Error');
};
