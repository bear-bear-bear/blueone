import express from 'express';
import { Notice, User } from '@/models';
import { isAdmin, isLoggedIn } from '@/routes/middlewares';
import type {
  PaginationQuery,
  QueryTypedRequest,
  CreateNoticeRequestBody,
  UpdateNoticeRequestBody,
} from 'typings';

const router = express.Router();

/**
 * 공지사항 목록 가져오기
 */
router.get(
  '/',
  isLoggedIn,
  async (req: QueryTypedRequest<PaginationQuery>, res, next) => {
    const { per_page = '30', page = '1' } = req.query;

    const limit = parseInt(per_page, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    try {
      const noticeList = await Notice.findAll({
        order: ['createdAt', 'DESC'],
        limit,
        offset,
      });
      res.status(200).json(noticeList);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
);

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
    console.error(err);
    next(err);
  }
});

/**
 * 공지사항 가져오기
 */
router.get('/:noticeId', isLoggedIn, async (req, res, next) => {
  const { noticeId } = req.params;

  try {
    const notice = await Notice.findOne({ where: { id: noticeId } });
    res.status(200).json(notice);
  } catch (err) {
    console.error(err);
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
    const notice = await Notice.findOne({ where: { id: noticeId } });

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
    console.error(err);
    next(err);
  }
});

/**
 * 공지사항 삭제
 */
router.put('/:noticeId', isLoggedIn, isAdmin, async (req, res, next) => {
  const { noticeId } = req.params;

  try {
    const notice = await Notice.findOne({ where: { id: noticeId } });

    if (!notice) {
      res.status(404).json({
        message: `id ${noticeId} 공지사항을 찾을 수 없습니다`,
      });
      return;
    }

    await notice.destroy();
    res.status(200).json(notice);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
