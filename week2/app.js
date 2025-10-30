const express = require('express');

const app = express();

const userRouter = require('./math');

app.use((req,res,next) => {
    console.log(`Someone sent a request: ${req.url}`);
    next();
})

app.use('/math', userRouter);

app.get('/', (req, res) => {
    res.send("Hello, world");
});

app.listen(3000, () => console.log("server listening on port 3000!"))