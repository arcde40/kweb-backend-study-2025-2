const express = require('express');

const app = express();

const mathRouter = require('./math');

const userRouter = require('./user');

app.use(mathRouter);

app.use(userRouter);

app.use((req, res, next) => {
    console.log(`Someone sent request: ${req.url}`);
    next();
});

app.get('/', (req, res) => { res.send('Hello, World!');});

app.listen(3000, () => {console.log('Server listening on port 3000!')});