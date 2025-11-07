const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('math_index');
});

router.get('/sum', (req,res) => {
    const a = req.query.a;
    const b = req.query.b;
    // 둘 다 전달되지 않으면 폼만 렌더
    if (a == null && b == null) return res.render('hw_math', { op: '+', action: '/math/sum' });
    // 둘 중 하나라도 비어있으면 에러
    if (a == null || b == null) return res.render('hw_math', { op: '+', action: '/math/sum', error: 'a와 b를 전달해주세요' });
    const na = Number(a), nb = Number(b);
    // 입력값이 숫자가 아닐 때
    if (Number.isNaN(na) || Number.isNaN(nb)) return res.render('hw_math', { op: '+', action: '/math/sum', error: '숫자만 입력하세요' });
    // 정상
    return res.render('hw_math', { a: na, b: nb, op: '+', action: '/math/sum', result: na + nb });
});

router.get('/sub', (req,res) => {
    const a = req.query.a;
    const b = req.query.b;
    // 둘 다 전달되지 않으면 폼만 렌더
    if (a == null && b == null) return res.render('hw_math', { op: '-', action: '/math/sub' });
    // 둘 중 하나라도 비어있으면 에러
    if (a == null || b == null) return res.render('hw_math', { op: '-', action: '/math/sub', error: 'a와 b를 전달해주세요' });
    const na = Number(a), nb = Number(b);
    // 입력값이 숫자가 아닐 때
    if (Number.isNaN(na) || Number.isNaN(nb)) return res.render('hw_math', { op: '-', action: '/math/sub', error: '숫자만 입력하세요' });
    // 정상
    return res.render('hw_math', { a: na, b: nb, op: '-', action: '/math/sub', result: na - nb });
});

module.exports = router;