const express = require('express');
const router = express.Router();

router.get('/sum', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).render('math', { message: '숫자를 올바르게 입력하세요.' });
  }
  res.render('math', { message: `Sum of ${a} and ${b} is ${a + b}` });
});

router.get('/sub', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).render('math', { message: '숫자를 올바르게 입력하세요.' });
  }
  res.render('math', { message: `Difference between ${a} and ${b} is ${a - b}` });
});

module.exports = router;
