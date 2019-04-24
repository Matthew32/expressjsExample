var express = require('Express');
var bodyParser = require('body-parser');
var app = express();
//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())
//First middleware before response is sent
app.use(function(req, res, next){
    console.log("Start");
    next();
 });

var things = require('./resources/test');
var movies = require('./resources/rest/movies');
var errors = require('./resources/handlers/errors');

//var things = require('./resources/login/loginExample');

//both index.js and things.js should be in same directory
app.use('/things', things);

app.use('/movies', movies);
app.use('/', errors);

app.listen(3000);