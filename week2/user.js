const { Router } = require('express');

const router = Router();

router.get('/user', (req,res) => {
    const a = req.query.a;
    const b = req.query.b;
    res.send(`${a} + ${b} = ${Number(a) + Number(b)}`);
}); // /user?a=3&b=5

router.get('/user', (req,res) => {
    res.send(`please input user id`);
});

router.get('/user/:id', (req,res,next)=> {
    if(req.params.id !== '1') res.send("you are not welcomed!");
    else next(); //next 타면 send 두번 해서 오류 -> else 사용
});

router.get('/user/:id', (req,res) => {
    res.send(`Hello, user ${req.params.id}`);
});

module.exports = router;