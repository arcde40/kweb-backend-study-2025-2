const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => res.redirect('/math/sum'));

router.post('/sum', (req, res, next) => {
    const a = parseFloat(req.body.num1);
    const b = parseFloat(req.body.num2);
    if (isNaN(a) || isNaN(b)) {
        res.send('Invalid value!');
    } else {
        req.result = a + b;
        next();
    }
});

router.post('/sum', (req, res) => {
    res.render('mathsite', { 
        title: 'Addition',
        action: '/sum',
        buttonLabel: 'Add Numbers',
        result: req.result
    });
});

router.post('/sub', (req, res, next) => {
    const a = parseFloat(req.body.num1);
    const b = parseFloat(req.body.num2);
    if (isNaN(a) || isNaN(b)) {
        res.send('Invalid value!');
    } else {
        req.result = a - b;
        next();
    }
});

router.post('/sub', (req, res) => {
    res.render('mathsite', { 
        title: 'Subtraction',
        action: '/sub',
        buttonLabel: 'Subtract Numbers',
        result: req.result
    });
});


module.exports = router;