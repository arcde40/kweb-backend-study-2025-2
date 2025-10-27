const { Router } = require('express');
const router = Router();

router.get('/sum', (req, res, next) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    if (isNaN(a) || isNaN(b)) res.send(`Unvalid value!`);
    else next();
})

router.get('/sum', (req, res) => {
    res.send(`${req.query.a} + ${req.query.b} = ${parseInt(req.query.a) + parseInt(req.query.b)}`);
})

router.get('/sub', (req, res, next) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    if (isNaN(a) || isNaN(b)) res.send(`Unvalid value!`);
    else next();
})

router.get('/sub', (req, res) => {
    res.send(`${req.query.a} - ${req.query.b} = ${parseInt(req.query.a) - parseInt(req.query.b)}`);
})

module.exports = router;