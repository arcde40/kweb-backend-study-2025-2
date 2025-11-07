const express = require('express');

const app = express();

// view engine 설정
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const userRouter = require('./user_math');

app.use('/math', userRouter); 

app.get('/', (req, res) => {
    res.send("Hello, world");
});

app.listen(3000, () => console.log("server listening on port 3000!"));