const express = require('express') ;

const app = express() ;

app.get('/hello', (req, res) =>{
    let i = 2 * 2 ;
    res.send('하이!!!!!!!!') ;  
    res.send(i);  
}) ;


app.get('/hi', (req, res) =>{
    res.send('잘가!!!!!!!!') ;  
}) ;

app.listen(3000, () => {console.log('port 3000 HI !!!!!!!!!!') ; }) ;

