const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => res.send('asdf'));

router.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.send(`${a+b}`);
});

router.get('/sub', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.send(`${a-b}`);
});

module.exports = router;