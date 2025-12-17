const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // TODO: authService.register() 호출 후 결과 반환
  const result = await authService.register(username, password)

  res.status(200).json(result);


});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // TODO:
  // 1. authService.login() 호출
  // 2. 세션에 userId 저장: req.session.userId = user.id
  // 3. 사용자 정보 반환
  const result = await authService.login(username, password)
  req.session.userId = result.id;

  res.status(200).json(result)
});

router.post('/logout', (req, res) => {
  // TODO: req.session.destroy() 호출
  req.session.destroy();
  res.status(200).send();
});

router.get('/me', async (req, res) => {
  // TODO:
  // 1. 세션 확인 (req.session.userId)
  // 2. authService.getCurrentUser() 호출
  // 3. 사용자 정보 반환
  const userID = req.session.userId;
  if(!userID) {
    res.status(401).json({message : 'You are not logged in'})
    return;
  }
  const user = await authService.getCurrentUser(userID)
  res.status(200).json(user);
});

module.exports = router;
