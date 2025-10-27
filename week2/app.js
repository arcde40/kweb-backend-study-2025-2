const express = require('express');
const app = express();
const userRouter = require('./user');
const mathRouter = require('./math');

app.use((req, res, next) => {
    console.log(`Someone made a request to ${req.url}`);
    next();
});

app.use(userRouter);
app.use('/math', mathRouter);

app.get('/', (req, res) => res.send("Hello, world!"));
app.listen(3000, () => console.log("Server listening at port 3000"));