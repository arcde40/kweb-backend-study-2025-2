const {runQuery} = require('./database');

const express = require('express');
const session = require('express-session');
const sanitizeHTML = require('sanitize-html');

const app = express();

app.use(session({
	secret: 'asdf',
	resave: false,
	saveUninitialized: true,
}));

app.get('/me', (req, res) => {
	const {requester} = req.session;
	if(!requester) return res.send('You are not logged in!');
	const {id, name, status} = requester;
	return res.send(`id : ${id}, name : ${name}, status : ${status}`);
});

app.get('/login', (req, res) => {
	const username = req.query.username;
	const password = req.query.password;

	if(password !== `1q2w3e4r`)
	{
		res.send(`Wrong Password!`);
		return;
	}

	req.session.requester = {
		id : 1,
		name : username,
		status : "졸려"
	}

	return res.send('Login Successful!');
});

app.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if(err) return res.send('Something went wrong..');
		return res.send('Success!');
	})
});

app.get('/student', async (req, res) => {
	const query = req.query.id;
	const result = await runQuery('SELECT * FROM students where student_id = ?' ,[query]);
	console.log(result)
	return res.send(JSON.stringify(result));
})

app.get('/xss', (req, res) => {
	const content = req.query.content;

	return res.send(sanitizeHTML(content));
})

app.listen(3000, ()=>console.log('server started!'));
