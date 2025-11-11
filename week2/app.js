const express = require('express');
const app = express();
const userRouter = require('./user');
const mathRouter = require('./math');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`Someone made a request to ${req.url}`);
    next();
});

app.get('/math/sum', (req, res) => {
    res.render('mathsite', { 
        title: 'Addition', 
        action: '/math/sum', 
        buttonLabel: 'Add Numbers' 
    });
});

app.get('/math/sub', (req, res) => {
    res.render('mathsite', { 
        title: 'Subtraction', 
        action: '/math/sub', 
        buttonLabel: 'Subtract Numbers' 
    });
});

app.use(userRouter);
app.use('/math', mathRouter);

app.get('/', (req, res) => res.send("Hello, world!"));
app.listen(3000, () => console.log("Server listening at port 3000"));