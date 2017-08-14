var express = require('express');
var bodyParser = require("body-parser"); 
var expressValidator = require('express-validator');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(expressValidator());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var title,date,duration,genre,synopsis;

app.post('/submit', function (req, res) {
	req.checkBody('title', 'Invalid title').notEmpty();
	req.checkBody('date', 'Invalid date').notEmpty();
	req.checkBody('duration', 'Invalid duration').notEmpty();
	req.checkBody('genre', 'Invalid genre').notEmpty();
	req.checkBody('synopsis', 'Invalid synopsis').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		console.log("found errors")
	}else{
		req.sanitizeBody('title').escape();
		req.sanitizeBody('title').trim();
		req.sanitizeBody('date').escape();
		req.sanitizeBody('date').trim();
		req.sanitizeBody('duration').escape();
		req.sanitizeBody('duration').trim();
		req.sanitizeBody('genre').escape();
		req.sanitizeBody('genre').trim();
		req.sanitizeBody('synopsis').escape();
		req.sanitizeBody('synopsis').trim();

		title = req.body.title;
	    date = req.body.date;
	    duration = req.body.duration;
	    genre = req.body.genre;
	    synopsis = req.body.synopsis;

	    console.log(req.body);

	    res.json(req.body);
	}
})

app.get('/query', function (req, res) {
	console.log("query");
	res.json({
		"title": title,
		"date": date,
		"duration": duration,
		"genre": genre,
		"synopsis": synopsis,
	});
})
 
var server = app.listen(8080, function () {
  console.log("Listen: http://%s:%s", server.address().address, server.address().port)
})
