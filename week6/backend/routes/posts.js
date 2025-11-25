const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // TODO: Implement get all posts
    // 1. Query all posts from database
    // 2. Join with users table to get username
    // 3. Include reply count
    // 4. Order by created_at desc

    res.status(200).json({ message: 'Get posts endpoint - to be implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Implement get single post
    // 1. Query post by id
    // 2. Join with users table to get username
    // 3. Include reply count
    // 4. Return 404 if not found

    res.status(200).json({ message: 'Get post by id endpoint - to be implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    // TODO: Implement create post
    // 1. Check authentication (middleware or manual)
    // 2. Validate input
    // 3. Insert post into database
    // 4. Return created post with user info

    res.status(201).json({ message: 'Create post endpoint - to be implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // TODO: Implement update post
    // 1. Check authentication
    // 2. Check if post exists and belongs to user
    // 3. Update post in database
    // 4. Return updated post

    res.status(200).json({ message: 'Update post endpoint - to be implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Implement delete post
    // 1. Check authentication
    // 2. Check if post exists and belongs to user
    // 3. Delete post from database
    // 4. Return success

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:postId/replies', async (req, res) => {
  try {
    const { postId } = req.params;

    // TODO: Implement get replies for a post
    // 1. Query all replies for the post
    // 2. Join with users table to get username
    // 3. Order by created_at

    res.status(200).json({ message: 'Get replies endpoint - to be implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:postId/replies', async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    // TODO: Implement create reply
    // 1. Check authentication
    // 2. Validate input
    // 3. Check if post exists
    // 4. Insert reply into database
    // 5. Return created reply with user info

    res.status(201).json({ message: 'Create reply endpoint - to be implemented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
