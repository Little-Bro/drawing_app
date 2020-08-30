const express = require('express');
const Datastore = require('nedb');

// initialising app and database
const app = express();
const database = new Datastore('database.db');

// loading database file into memory
database.loadDatabase();

// starting server 
const port = 3000;
app.listen(port, () => {
	console.log(`running server at ${port}`);
})

// serving static files, parsing JSON
app.use(express.static('public'));
app.use(express.json());

// handle POST requests
app.post('/api', (req, res) => {
	const data = req.body;
	const timeStamp = Date.now();
	data.timestamp = timeStamp;
	database.insert(data);

	res.json(data);
});

// handle GET requests
app.get('/api', (req, res) => {
	database.find({}, (err, data) => {
		if (err) {
			res.end;
			console.error(err);
			return;
		}
		res.json(data);
	});
});