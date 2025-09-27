const {Router} = require('express');

const router2 = Router();

router2.get('/math/sum/:a/:b', (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    if (isNaN(a) || isNaN(b)) return res.status(400).send('Invalid query parameters');
    res.send(`Sum is ${a + b}!`);
});

router2.get('/math/sub/:a/:b', (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    if (isNaN(a) || isNaN(b)) return res.status(400).send('Invalid query parameters');
    res.send(`Sub is ${a - b}!`);
});
module.exports = router2;