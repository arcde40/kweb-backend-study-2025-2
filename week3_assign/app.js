const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static('public'));

/* Your Code Here */

const mathRouter = require('./route/math') ;

app.use((req, res, next) => {
    console.log(`Someone sent a request : ${req.url}`) ; 
    next() ; 
})

app.use('/math', mathRouter) ;

app.get('/', (req, res) =>{
    res.send('Hello, World!') ;  
}) ;

app.get('/bye', (req, res) =>{
    res.send('Goodbye, World!') ;  
}) ;

app.use((err, req, res, next) => {
    console.log(err.stack) ;
    const status = err.status || 500 ; 
    const message = err.message || "Something Wrong!" ;
    res.status(status).send(message) ; 
}) 

app.listen(3000, () => {console.log('port 3000 OK');}) ;

