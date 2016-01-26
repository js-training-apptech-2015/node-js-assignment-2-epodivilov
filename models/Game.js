var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Game = new Schema({
    token: { type: String , unique: true},
    type: Number,
    field1: Number,
    field2: Number,
    state: String,
    group: String
});

module.exports = mongoose.model('Game', Game);