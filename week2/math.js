const { Router } = require('express');
const router = Router();

router.get('/sum', (req, res, next) => {
    const { a, b } = req.query;

    if ( a === undefined || b === undefined) {
        return res.status(400).send("Please input a and b");
    }
    else next();
})

router.get('/sum', (req, res) => {
    const numA = parseInt(req.query.a);
    const numB = parseInt(req.query.b);
    if (isNaN(numA) || isNaN(numB)) return res.status(400).send("Unvalid value!");
    const result = numA + numB
    res.send(`The sum of ${numA} and ${numB} is ${result}!`)
})

router.get('/sub', (req, res, next) => {
    const { a, b } = req.query;

    if ( a === undefined || b === undefined) {
        return res.status(400).send("Please input a and b");
    }
    else next();
})

router.get('/sum', (req, res) => {
    const numA = parseInt(req.query.a);
    const numB = parseInt(req.query.b);
    if (isNaN(numA) || isNaN(numB)) return res.status(400).send("Unvalid value!");
    const result = numA - numB
    res.send(`The sum of ${numA} and ${numB} is ${result}!`)
})

module.exports = router;