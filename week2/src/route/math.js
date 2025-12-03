const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('math', { result: null });
});

router.post('/', (req, res) => {
    const a = Number(req.body.a);
    const b = Number(req.body.b);

    const sum = a + b;
    const sub = a - b;

    res.render('math', { 
        result: { sum: sum, sub: sub } 
    });
});

module.exports = router;