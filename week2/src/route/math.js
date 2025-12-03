const express = require('express');
const router = express.Router();

// [GET] /math -> 그냥 화면만 보여줘 (렌더링)
router.get('/', (req, res) => {
    // math.pug 파일을 그려라. 데이터는 없음.
    res.render('math', { result: null });
});

// [POST] /math -> 폼에서 보낸 데이터를 받아서 계산해
router.post('/', (req, res) => {
    // HTML Form의 input name="a", name="b"가 req.body에 들어옴
    const a = Number(req.body.a);
    const b = Number(req.body.b);

    // 계산 로직
    const sum = a + b;
    const sub = a - b;

    // 다시 math.pug를 그리는데, 이번엔 결과(result)를 같이 보냄
    res.render('math', { 
        result: { sum: sum, sub: sub } 
    });
});

module.exports = router;