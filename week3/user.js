const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('calc', { result: null });
});

router.post('/calc', (req, res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    if (isNaN(a) || isNaN(b)) {
        return res.render('calc', { error: '숫자를 입력하세요.', result: null });
    }

    const sum = a + b;
    const sub = a - b;

    res.render('calc', { result: { sum, sub }, error: null });
});

module.exports = router;
