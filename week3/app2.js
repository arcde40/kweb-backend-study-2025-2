const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 라우터 연결
const userRouter = require('./user');
app.use('/', userRouter);

app.listen(3000, () => console.log('Server running'));
