const { Router } = require("express");

const router = Router();

router.get('/', (req, res) => {
    res.send(`Please input a and b.<br>Format: /math/add?a=1&b=3`);
});

router.get('/add', (req, res) => {
    console.log(`Someone add something`);

    const a = req.query.a;
    const b = req.query.b;

    if(a === undefined || b === undefined)
        return res.send(`Invalid Format<br>Format: /math/add?a=1&b=3`);

    const num_a = parseFloat(a);
    const num_b = parseFloat(b);

    res.send(`${num_a}+${num_b}=${num_a+num_b}`);
});

router.get('/sub', (req, res) => {
    console.log(`Someone sub something`);

    const a = req.query.a;
    const b = req.query.b;

    if(a === undefined || b === undefined)
        return res.send(`Invalid Format<br>Format: /math/sub?a=1&b=3`);

    const num_a = parseFloat(a);
    const num_b = parseFloat(b);

    res.send(`${num_a}-${num_b}=${num_a-num_b}`);
});

module.exports = router;