const { Router } = require('express')

const router = Router();

router.get('/', (req, res) => {
    res.send(`안녕하세요, 현재 URL의 뒤에 "/add", "/sub" 혹은 "/mul" 을 붙여서 두 수의 연산 기능을 수행하실 수 있습니다. div는 귀찮아서 안했어옹.`)
})

const operator = ["add", "sub", "mul"]

operator.forEach((value, index) => {
    router.get(`/${value}`, (req, res) => {
        const a = Number(req.query.a)
        const b = Number(req.query.b)

        if(!a || !b){
            res.send(`이런! 연산하고자 하는 값이 주어지지 않았습니다.\nURL의 "/${value}" 문자열 뒤에 "?a={숫자}&b={숫자}" 를 알맞게 넣어서 입력해주시길 바랍니다.`)
        }
        else{
            if(value === "add"){
                res.send(`결과 : ${a + b}`)
            }
            else if(value === "sub"){
                res.send(`결과 : ${a - b}`)
            }
            else{
                res.send(`결과 : ${a * b}`)
            }
        }
    })
})

module.exports = router;