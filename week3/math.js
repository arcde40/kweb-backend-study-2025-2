const { Router } = require("express");

const router = Router();

let log = [];
let result;

router.get('/', (req, res) => {
    const { page } = req.query;
    res.render('todo.pug', { log, result });
});

router.post('/add', (req, res) => {
    const x = parseInt(req.body.x);
    const y = parseInt(req.body.y);
    if(x && y || (x === 0 || y === 0)) {
        result = `${x} + ${y} = ${x+y}`;
        console.log(result);
        log.unshift(result);
        res.redirect('./');
    }
});

router.post('/sub', (req, res) => {
    const x = parseInt(req.body.x);
    const y = parseInt(req.body.y);
    if(x && y || (x === 0 || y === 0)) {
        result = `${x} - ${y} = ${x-y}`;
        console.log(result);
        log.unshift(result);
        res.redirect('./');
    }
});

module.exports = router;