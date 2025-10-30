const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send("Sum 또는 Subtraction하기");
});

router.get('/sum', (req,res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.send(`${a} + ${b} = ${Number(a) + Number(b)}`);
});

router.get('/sub', (req,res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.send(`${a} - ${b} = ${Number(a) - Number(b)}`);
});

module.exports = router;