const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('calculator', { result: null, error: null });
});

router.post('/calculate', (req, res) => {
    const { a, b } = req.body;
    
    const numA = parseInt(a);
    const numB = parseInt(b);

    if (isNaN(numA) || isNaN(numB)) {
        return res.render('calculator', { 
            error: '유효한 숫자를 입력하세요.',
            result: null 
        });
    }

    const sum = numA + numB;
    const sub = numA - numB;

    res.render('calculator', {
        error: null,
        result: {
            a: numA,
            b: numB,
            sum: sum,
            sub: sub
        }
    });
});



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

router.get('/sub', (req, res) => {
    const numA = parseInt(req.query.a);
    const numB = parseInt(req.query.b);
    if (isNaN(numA) || isNaN(numB)) return res.status(400).send("Unvalid value!");
    const result = numA - numB
    res.send(`The difference of ${numA} and ${numB} is ${result}!`) 
})

module.exports = router;