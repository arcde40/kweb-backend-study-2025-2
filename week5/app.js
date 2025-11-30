const {runQuery} = require('./database');

const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
	secret: 'asdf',
	resave: false,
	saveUninitialized: true,
}));

app.get('/me', (req, res) => {

});

app.get('/login', (req, res) => {

});

app.get('/logout', (req, res) => {

});

app.listen(3000, ()=>console.log('server started!'));
