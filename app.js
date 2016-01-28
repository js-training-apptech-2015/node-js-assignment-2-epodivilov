var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var config = require('./config.json');
var router = require('./router');

var port = process.env.PORT || config.port;
var dbUri = process.env.MONGO_URI || config.dbUri;
mongoose.connect(dbUri);

var app = express();
app.locals.title = 'Tic-tac-toe server';
app.use(express.static(__dirname + '/public'));

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    next();
});

app.use(bodyParser.json());
app.use('/', router);

//Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(err);
});

app.listen(port);