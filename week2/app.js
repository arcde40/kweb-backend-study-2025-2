const express = require('express');

const app = express();

const userRouter = require('./user');

app.use((req,res,next) => {
    console.log(`Someone sent a request: ${req.url}`);
    next();
});

app.use('/user', userRouter); // /user로 시작하는 요청은 userRouter가 처리 ->user에서 /user 빼도됨

app.get('/', (req, res) => {
    res.send("Hello, world");
});

app.listen(3000, () => console.log("server listening on port 3000!"));