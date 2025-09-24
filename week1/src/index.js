const express = require("express");
const app = express();

app.get('/',(req,res)=>{res.send('Hello,world!');});
app.get('/bye',(req,res)=>{res.send('good bye...!');});

app.listen(3000, ()=>{console.log('Server listening on Port 3000');});
