var express = require('express');
var router = express.Router();
var Game = require('../models/Game');
var Utils = require('../utils');

function checkGameOver(fieldPlayer1, fieldPlayer2) {
    var winCombinations = [7,56,448,73,146,252,273,84];
    var result;
    for (var i = 0; i < winCombinations.length; i++) {
        if (fieldPlayer1 == winCombinations[i]) {
            result = 'first-player-wins';
        } else if (fieldPlayer2 == winCombinations[i]) {
            result = 'second-player-wins';
        } if ((fieldPlayer1|fieldPlayer2) == 511) {
            result = 'tie';
        }
    }

    return result;

}

router.get('/', function (req, res, next) {
    res.end('end');
});

router.get('/games', function (req, res, next) {
    if(req.query && Utils.isValidQuery(req.query, Game)) {
        Game.find(req.query, '-_id -__v', function (err,data) {
            if (err) return next('Bad request! ' + err);
            if (data.length) {
                res.send(data);
            } else {
                res.send('Games not found');
            }
        });
    } else {
        return next('Error! Bad query!');
    }
});

router.get('/games/:token', function (req, res, next) {
    Game.findOne({token:req.params.token}, '-_id -__v', function (err,data) {
        if (err) return next('Bad request! ' + err);
        if (data) {
            res.send(data);
        } else {
            res.send('Games not found');
        }
    });
});

router.post('/games', function (req, res, next) {
    var newGame = new Game({
        field1: '0',
        field2: '0',
        group: req.body.group || 'default',
        password: req.body.password,
        state: 'first-player-turn',
        token: Utils.generateToken(32),
        type: req.body.type
    });

    newGame.save(function(err, model) {
        if (err) return next('Error request! ' + err);
        Game.findOne(model, '-_id -__v', function (err,data) {
            if (err) return next('Bad request! ' + err);
            res.status(201).send(data);
        });
    })
});

router.put('/games/:token', function (req, res, next) {
    if ((req.body.position >= 0 && req.body.position <= 8) && (req.body.player == 1 || req.body.player == 2)) {
        Game.findOne({token:req.params.token}, function (err,data) {
            if (err) return next('Bad request! ' + err);

            if (data.state.indexOf('wins') != -1 || data.state.indexOf('tie') != -1) {
                return next('The game has already finished.');
            }

            if (data.password && !req.body.password) {
                return next('You must specify a password!');
            } else if (data.password != req.body.password) {
                return next('Wrong password!');
            }

            var state = (req.body.player == 2) ? 'second-player-turn' : 'first-player-turn';

            if (state != data.state) {
                return next('Wrong turn!');
            } else {
                state = (req.body.player == 1) ? 'second-player-turn' : 'first-player-turn';
            }

            var freeField = Utils.createBinaryString(data.field1|data.field2).split('').reverse();

            if (freeField[req.body.position] != 1) {
                var newField = Utils.createBinaryString(data['field' + req.body.player]).split('').reverse();
                newField[req.body.position] = '1';
                data['field' + req.body.player] = parseInt(newField.reverse().join(''),2);

                if (checkGameOver(data.field1, data.field2)) {
                    state = checkGameOver(data.field1, data.field2);
                }

                data.state = state;

                data.save(function(err, model) {
                    if (err) return next('Bad request! ' + err);
                    Game.findOne(model, '-_id -__v', function (err,data) {
                        if (err) return next('Bad request! ' + err);
                        res.send(data);
                    });
                })
            } else {
                res.send('Position already occupied!');
            }
        });
    } else {
        return next('Bad request!');
    }

});

module.exports = router;