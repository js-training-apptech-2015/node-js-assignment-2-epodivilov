var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Game = new Schema({
    token: {
        type: String,
        unique: true,
        validate: {
            validator: function(value) {
                return /^(\d{32})$/.test(value);
            },
            message: '{VALUE} is not a valid token!'
        }
    },
    type: {
        type: Number,
        validate: {
            validator: function(value) {
                return value == 0;
            },
            message: '{VALUE} is not a valid type!'
        }
    },
    field1: {
        type: Number,
        validate: {
            validator: function(value) {
                return (value >= 0) && (value <= 511);
             },
            message: '{VALUE} is not a valid field1!'
        }
    },
    field2: {
        type: Number,
        validate: {
            validator: function(value) {
                return (value >= 0) && (value <= 511);
            },
            message: '{VALUE} is not a valid field2!'
        }
    },
    state: String,
    group: {
        type: String,
        lowercase: true,
        validate: {
            validator: function(value) {
                return /^([a-z0-9]{1,20})$/.test(value);
            },
            message: '{VALUE} is not a valid group name!'
        }
    }
});

module.exports = mongoose.model('Game', Game);