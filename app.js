var express = require('express');
var ip = require('ip');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config.json');

var router = require('./router');


var app = express();
mongoose.connect(config.dbUrl);

app.use(bodyParser.json());
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    next();
});
app.use('/', router);

app.listen(config.port, function () {
    console.log('Server start. Server available to http://' + ip.address() + ':' + config.port);
});