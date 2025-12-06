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
	const {requester} = req.session;
	if(!requester) return res.send('Your are not logged in!');
	const {id, name, status} = requester;
	res.send(`id: ${id}, name: ${name}, status: ${status}`)
});

app.get('/login', (req, res) => {
	const username = req.query.username;
	const password = req.query.password;
	if (password !== '1q2w3e4r') {
		res.send('Wrong password!');
		return;
	}
	req.session.requester = {
		id: 1,
		name: username,
		status: '매우 졸림'
	}
	return res.send('Login successful');
});

app.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if(err) return res.send('Something went wrong..');
		return res.send('Success!');
	})
});

app.get('/student', async (req,res) => {
	const query = req.query.id;
	const result = await runQuery('select * from students where student_id = ?', [query]);
	return res.send(JSON.stringify(result));
})

app.listen(8080, ()=>console.log('server started!'));
