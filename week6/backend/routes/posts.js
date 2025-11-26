const express = require('express');
const router = express.Router();
const postService = require('../services/postService');
const replyService = require('../services/replyService');

router.get('/', async (req, res) => {
  try {
    // postService.getAllPosts() 호출 후 결과 반환
    const result = await postService.getAllPosts()
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // postService.getPostById() 호출 후 결과 반환
    const result = await postService.getPostById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    // 1. 세션에서 userId 가져오기
    // 2. postService.createPost() 호출
    // 3. 201 상태코드와 함께 결과 반환

    const userId = req.session.userId;
    const result = await postService.createPost(title, content, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // 1. 세션에서 userId 가져오기
    // 2. postService.updatePost() 호출
    // 3. 결과 반환
    const userId = req.session.userId;
    const result = await postService.updatePost(id, title, content, userId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 1. 세션에서 userId 가져오기
    // 2. postService.deletePost() 호출
    // 3. 204 상태코드 반환
    const userId = req.session.userId;
    await postService.deletePost(id, userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:postId/replies', async (req, res) => {
  try {
    const { postId } = req.params;

    const result = await replyService.getRepliesByPostId(postId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:postId/replies', async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    // 1. 세션에서 userId 가져오기
    // 2. replyService.createReply() 호출
    // 3. 201 상태코드와 함께 결과 반환
    const userId = req.session.userId;
    const result = await replyService.createReply(content, postId, userId);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
