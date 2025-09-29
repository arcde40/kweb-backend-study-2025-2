const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.send(`${a}, ${b}`);
})

router.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    const result = Number(a) + Number(b);
    res.send(`${result}`);
});

router.get('/sub', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    const result = Number(a) - Number(b);
    res.send(`${result}`);
});

module.exports = router;