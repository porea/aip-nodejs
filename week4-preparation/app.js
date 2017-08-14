var express = require('express');
var bodyParser = require("body-parser"); 
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var title,date,duration,genre,synopsis;

app.post('/submit', function (req, res) {
	console.log(req.body);

    title = req.body.title;
    date = req.body.date;
    duration = req.body.duration;
    genre = req.body.genre;
    synopsis = req.body.synopsis;
    
	res.json(req.body);
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
