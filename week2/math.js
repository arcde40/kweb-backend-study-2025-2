const { Router } = require('express');

const router = Router();

router.get('/sum', (req,res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.send(`${a + b}`);
})

router.get('/sub', (req,res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.send(`${a - b}`);
})

module.exports = router;