const express = require('express');

const app = express();

const userRouter = require('./user');

const mathRouter = require('./math');

app.use((req, res, next) => {
    console.log(`Someone sent a request: ${req.url}`);
    next();
})

app.use('/user', userRouter);

app.use('/math', mathRouter);

app.get('/', (req, res) => {res.send('Hello, World!'); });

app.listen(3000, () => {console.log('Server listening on port 3000!')});
