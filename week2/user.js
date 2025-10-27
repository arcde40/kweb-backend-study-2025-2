const { Router } = require('express');
const router = Router();

router.get('/user', (req, res, next) => {
    if (req.query.id === undefined) {
        res.send(`No user id!`);
    } else next();
})

router.get('/user', (req, res) => {
    res.send(`You requested ${req.query.id}!`);
})

router.get('/user/:id', (req, res, next) => {
    if (req.query.id !== '1') res.send(`You are not welcomed.`);
    else next();
})

router.get('/user/:id', (req, res) => {
    res.send(`Hello, user ${req.params.id}!`);
})

module.exports = router;
