const express = require('express');
const router = express.Router();
const replyService = require('../services/replyService');

router.delete('/:replyId', async (req, res) => {
  const { replyId } = req.params;

  // TODO:
  // 1. 세션에서 userId 가져오기
  // 2. replyService.deleteReply() 호출
  // 3. 200 상태코드 반환

  res.status(501).json({ error: 'Not implemented' });
});

module.exports = router;
