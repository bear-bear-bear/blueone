import type { RequestHandler } from 'express';

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
