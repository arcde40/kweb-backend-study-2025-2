const { Router } = require('express')

const router = Router();

const HTMLtemplate = (text) => {
    const template = `
    <!DOCTYPE html>
    <html>
        <head>
            <style>
                @font-face {
                    font-family: 'Yangjin';
                    src: url('https://cdn.jsdelivr.net/gh/supernovice-lab/font@0.9/yangjin.woff') format('woff');
                    font-weight: normal;
                    font-display: swap;
                }
                .my_text{
                    font-family: 'Yangjin';
                    font-size: 40px;
                }
            </style>
        </head>
        <body>
            <div class = "my_text">${text}</div>
        </body>
    </html>
    `

    return template
}

router.get('/', (req, res) => {
    res.send(HTMLtemplate(`안녕하세요, 현재 URL의 뒤에
        <br>
        "/add", "/sub" 혹은 "/mul" 을 붙여서 두 수의 연산 기능을 수행하실 수 있습니다.
        <br>
        div는 귀찮아서 안했어옹.`
    ))
})

const operator = ["add", "sub", "mul"]


operator.forEach((value, index) => {
    router.get(`/${value}`, (req, res) => {
        const a = Number(req.query.a)
        const b = Number(req.query.b)

        if(!a || !b){
            res.send(HTMLtemplate(`이런! 연산하고자 하는 값이 주어지지 않았습니다. 
                <br> 
                URL의 "/${value}" 문자열 뒤에 
                <br>
                <br>
                "?a={숫자}&b={숫자}"
                <br>
                <br>
                 를 알맞게 넣어서 입력해주시길 바랍니다.`))
        }
        else{
            if(value === "add"){
                res.send(HTMLtemplate(`a + b = ${a + b}`))
            }
            else if(value === "sub"){
                res.send(HTMLtemplate(`a - b = ${a - b}`))
            }
            else{
                res.send(HTMLtemplate(`a * b = ${a * b}`))
            }
        }
    })
})

module.exports = router;