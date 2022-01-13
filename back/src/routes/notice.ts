import express from 'express';
import { Notice } from '@/models';
import { isAdmin, isLoggedIn } from '@/middlewares';
import type { CreateNoticeRequestBody, UpdateNoticeRequestBody } from 'typings';

const router = express.Router();

/**
 * 공지사항 목록 가져오기
 */
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const noticeList = await Notice.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(noticeList);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/**
 * 공지사항 작성
 */
router.post('/', isLoggedIn, isAdmin, async (req, res, next) => {
  const { title, content }: CreateNoticeRequestBody = req.body;

  try {
    const notice = await Notice.create({
      title,
      content,
      userId: req.user?.id,
    });

    res.status(202).json(notice);
  } catch (err) {
    next(err);
  }
});

/**
 * 공지사항 가져오기
 */
router.get('/:noticeId', isLoggedIn, async (req, res, next) => {
  const { noticeId } = req.params;

  try {
    const notice = await Notice.findByPk(noticeId);

    if (!notice) {
      res.status(404).json({
        message: `id ${noticeId} 공지사항을 찾을 수 없습니다`,
      });
      return;
    }

    res.status(200).json(notice);
  } catch (err) {
    next(err);
  }
});

/**
 * 공지사항 수정
 */
router.put('/:noticeId', isLoggedIn, isAdmin, async (req, res, next) => {
  const { noticeId } = req.params;
  const { title, content }: UpdateNoticeRequestBody = req.body;

  try {
    const notice = await Notice.findByPk(noticeId);

    if (!notice) {
      res.status(404).json({
        message: `id ${noticeId} 공지사항을 찾을 수 없습니다`,
      });
      return;
    }

    notice.title = title;
    notice.content = content;
    await notice.save();
    res.status(200).json(notice);
  } catch (err) {
    next(err);
  }
});

/**
 * 공지사항 삭제
 */
router.put('/:noticeId', isLoggedIn, isAdmin, async (req, res, next) => {
  const { noticeId } = req.params;

  try {
    const notice = await Notice.findByPk(noticeId);

    if (!notice) {
      res.status(404).json({
        message: `id ${noticeId} 공지사항을 찾을 수 없습니다`,
      });
      return;
    }

    await notice.destroy();
    res.status(200).json(notice);
  } catch (err) {
    next(err);
  }
});

export default router;
