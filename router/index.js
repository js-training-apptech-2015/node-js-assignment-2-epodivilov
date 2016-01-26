var express = require('express');
var router = express.Router();
var Game = require('../models/Game');
var Utils = require('../utils');


router.get('/', function (req, res, next) {
    res.end('end');
});

router.get('/games', function (req, res, next) {
    if(req.query && Utils.isValidQuery(req.query)) {
        Game.find(req.query, '-_id -__v', function (err,data) {
            if (data.length) {
                res.send(data);
            } else {
                res.send('Games not found');
            }
        });
    } else {
        next('Error! ' + Object.keys(req.query) + ' not found');
    }
});

router.get('/games/:token', function (req, res, next) {
    if (req.params.token.length == 32) {
        Game.findOne({token:req.params.token}, '-_id -__v', function (err,data) {
            res.send(data);
        });
    } else {
        res.send('Token is not valid!');
    }
});

router.post('/games', function (req, res, next) {
    var newGame = new Game({
        token: Utils.generateToken(32),
        type: req.body.type,
        field1: '0',
        field2: '0',
        state: 'first-player-turn',
        group: req.body.group || 'default'
    });

    newGame.save(function(err, model) {
        if (err) next('Bad request!');
        Game.findOne(model, '-_id -__v', function (err,data) {
            res.send(data);
        });
    })
});

router.put('/games/:token', function (req, res, next) {
    if (req.params.token.length == 32) {
        var update;
        switch (req.body.player) {
            case 1: update = {$set: { field1: req.body.position}}; break;
            case 2: update = {$set: { field2: req.body.position}}; break;
        }

        Game.update({token:req.params.token}, update, function (err,data) {
            Game.findOne({token:req.params.token}, '-_id -__v', function (err,data) {
                res.send(data);
            });
        });
    } else {
        res.send('Token is not valid!');
    }
});

module.exports = router;