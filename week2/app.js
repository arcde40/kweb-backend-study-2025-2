const express = require('express') ;

const app = express() ;

const userRouter = require('./user') ; 

app.use((req, res, next) => {
    console.log(`Someone sent a request : ${req.url}`) ; 
    next() ; 
})

app.use(userRouter) ;


app.get('/', (req, res) =>{
    res.send('“Hello, World!') ;  
}) ;

app.get('/user/:id', (req, res) => {
    res.send(`Hello, user ${req.params.id}`) ;
}) ;



app.get('/bye', (req, res) =>{
    res.send('Goodbye, World!') ;  
}) ;



app.listen(3000, () => {console.log('port 3000 OK');}) ;

